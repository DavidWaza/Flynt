# How the app works and how requests are made

This document describes the Flynt app structure, authentication flow, and how API requests are built and sent.

---

## 1. App overview

- **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand, TanStack React Query, Axios, Sonner (toasts).
- **API base URL:** Set via `NEXT_PUBLIC_API_URL` (e.g. in `.env`). All API calls use this base.

### Route groups

- **Public:** `/`, `/waitlist`, etc.
- **Auth (guest):** `(auth)` — `/login`, `/register`, `/verify-email`, `/onboard`, etc.
- **Protected:** `(protected)` — `/dashboard`, `/dashboard/*`, `/onboarding/success`. Require a valid auth token.

Access control can be enforced in **middleware** (if present): it reads the auth token cookie, optionally calls `/auth/me`, and redirects unauthenticated users away from protected paths and authenticated users away from auth pages (e.g. to `/dashboard`).

---

## 2. How requests are made

### 2.1 Layers

| Layer | Role |
|-------|------|
| **`lib/api/types.ts`** | Shared types: `TypeApiResponse<T>`, `ApiResponse<T>`, `User`, payload/response types per endpoint. |
| **`lib/api/client.ts`** | Single Axios instance, interceptors (auth + errors), and helpers: `customFetch`, `useCustomFetchQuery`, `useCustomFetchMutation`, `createQueryKey`, `processError`, `showErrorToast`. |
| **`lib/api/requests.ts`** | Concrete API functions and hooks that call the client with specific URLs and types (e.g. `loginRequest`, `registerRequest`, `getCurrentUser`). |

New endpoints: add **types** in `lib/api/types.ts`, **request functions/hooks** in `lib/api/requests.ts`; they automatically use the shared client (base URL, auth, error handling).

### 2.2 Base URL and Axios instance

- Base URL comes from `process.env.NEXT_PUBLIC_API_URL`.
- One Axios instance is created with that `baseURL`, a long timeout, and `Content-Type: application/json`.

All requests go through this instance, so they all pass through the same request and response interceptors.

### 2.3 Request interceptor (auth)

- Before each request, the client reads the auth token from the cookie (via `getToken()` from `lib/auth-cookie.ts`).
- If a token exists, it sets:
  - `Authorization: Bearer <token>`.
- So: **login/register** (no token yet) go without `Authorization`; **all other requests** after login send the token automatically.

### 2.4 Response interceptor (errors and toasts)

- On **error response** (4xx/5xx), the interceptor:
  - Uses `processError(error)` to get a **title** and **message** from the API body (or fallbacks).
  - Calls `showErrorToast(error, fallback)` so Sonner shows a toast with **title** and **description** (message).
- Handled statuses:
  - **401** → “Unauthorized” / “Please sign in again.”
  - **403** → “Access Denied”
  - **404** → “Not Found”
  - **5xx** → “Server Error” / “Please try again later.”
  - **Default** → “Error” / “Something went wrong.”
- If there is **no response** (e.g. network failure), it shows a “Network Error” toast with a short description.

### 2.5 API error shape

The client supports the backend error format:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": ["Please provide a valid phone number"]
  }
}
```

- **`processError(err)`** returns `{ title, message }`:
  - If `response.data.error` exists: **title** = `error.message` (default “Validation failed”), **message** = `error.details` joined, or the same as title if no details.
  - Otherwise it derives a single message from `errors`, `message`, or generic fallback and returns `title: "Error"` and that message.
- **`showErrorToast(err, fallback)`** calls `toast.error(title, { description: message })`, using `fallback` when title or message is missing.

So every error toast has a **title** and a **message** (description).

---

## 3. Ways to call the API

### 3.1 `customFetch<T>(url, options?)`

- Low-level async function: runs one HTTP request (GET/POST/PATCH/PUT/DELETE) via the Axios instance.
- **Use for:** one-off calls (e.g. login, register, get current user) from event handlers or `useEffect`.
- **Returns:** `Promise<T>` (response body).
- **Example:**

```ts
const res = await customFetch<TypeApiResponse<LoginResponseData>>("/auth/login", {
  method: "post",
  body: { email, password },
});
```

All interceptors (auth header, error toasts) apply.

### 3.2 `useCustomFetchQuery<T>(url, options?)`

- Wraps **TanStack React Query** `useQuery` for **GET** requests.
- **Use for:** fetching data that should be cached, refetched, and tied to loading/error state.
- **Returns:** React Query result (`data`, `isLoading`, `error`, `refetch`, etc.). `data` is typed as `ApiResponse<T>`.
- **Options:** `queryKey`, `enabled`, `staleTime`, `gcTime`, `refetchOnWindowFocus`, `config`.
- On **failure**, it shows an error toast (via `showErrorToast`) and returns a fallback `{ status: false, message, data: undefined }` so the hook doesn’t throw.

### 3.3 `useCustomFetchMutation<T>(url, method, options?)`

- Wraps **TanStack React Query** `useMutation` for **POST / PUT / PATCH / DELETE**.
- **Use for:** form submits and other mutations.
- **Returns:** mutation object with `mutate`, `mutateAsync`, `mutateSync`, `isPending`, etc. `mutateAsync` returns `Promise<ApiResponse<T>>`.
- **Options:** `onSuccess`, `onError`, `invalidateQueries` (array of query keys to invalidate after success), `config`.
- Errors are still handled by the **response interceptor** (toasts); you can also use `onError` for custom logic.

### 3.4 `createQueryKey(baseKey, params?)`

- Helper to build React Query keys: `[baseKey]` or `[baseKey, params]`. Use with `useCustomFetchQuery` and `invalidateQueries`.

---

## 4. Where requests are defined

**File: `lib/api/requests.ts`**

- Imports `customFetch`, `useCustomFetchQuery`, `useCustomFetchMutation`, `createQueryKey` from `./client` and types from `./types`.
- Defines one function or hook per endpoint, e.g.:
  - **Auth:** `loginRequest`, `registerRequest`, `getCurrentUser`
  - **Example:** `getExample`, `useExampleQuery`, `useCreateExampleMutation`

To add a new endpoint:

1. Add any new **request/response types** in `lib/api/types.ts`.
2. In `lib/api/requests.ts`, add either:
   - A `customFetch`-based async function (e.g. `someRequest(body)`), or
   - A `useCustomFetchQuery` / `useCustomFetchMutation` hook (e.g. `useSomeQuery()`, `useSomeMutation()`).

URLs are **paths only** (e.g. `/auth/login`); the client prepends `NEXT_PUBLIC_API_URL`.

---

## 5. Auth and cookies

### 5.1 Token cookie

**File: `lib/auth-cookie.ts`**

- **Cookie name:** `flynt_token`.
- **Helpers:**
  - `getToken()` — read token (client-side).
  - `setToken(token)` — set token (e.g. after login), 7-day max-age, path `/`, SameSite Lax, Secure on HTTPS.
  - `clearToken()` — remove token (e.g. logout or after invalid session).

The **API client** uses `getToken()` in the request interceptor to send `Authorization: Bearer <token>` on every request after login.

### 5.2 Register data cookie

- **Cookie name:** `flynt_register_data`.
- **Helpers:** `setRegisterData(data)`, `getRegisterData()`, `clearRegisterData()`.
- Used to pass registration response (e.g. email, name) to the verify-email page; short-lived (e.g. 15 minutes).

### 5.3 Auth store (Zustand)

**File: `stores/use-auth-store.ts`**

- **State:** `user: User | null`.
- **Actions:**
  - `setData(partial)` — set store fields (e.g. `setData({ user })`).
  - `fetchUser()` — GET `/auth/me` via `getCurrentUser()`; on success sets `user` from response; on failure clears user and token.

After **login**, the app sets the token with `setToken`, sets the user (e.g. from login response or by calling `fetchUser()`). The **dashboard layout** (or similar) can call `fetchUser()` when a token exists so the UI has the current user. On **logout**, the app calls `clearToken()` and `setData({ user: null })`.

---

## 6. Validation

**File: `lib/validations/auth.ts`**

- **Yup** schemas: `loginSchema`, `registerSchema` (and exported types).
- Used on **login** and **register** pages to validate before calling `loginRequest` / `registerRequest`; validation errors are shown on the inputs and the API is only called when validation passes.

---

## 7. Flow summary

1. **Login:** Form validated with `loginSchema` → `loginRequest({ email, password })` → on success: `setToken(data.token)`, `setData({ user: data.user })` (or `fetchUser()`), redirect to `/dashboard`.
2. **Register:** Form validated with `registerSchema` → `registerRequest(...)` → on success: `setRegisterData(data)`, redirect to `/verify-email`. Verify-email page can read email from `getRegisterData()` or query params.
3. **Protected pages:** If middleware is used, it checks the token and optionally `/auth/me`, then allows or redirects. On the client, the dashboard layout (or similar) calls `fetchUser()` when a token exists so the auth store has the current user.
4. **Any API call:** Uses the shared Axios instance → request interceptor adds `Bearer` token if present → backend responds → on error, response interceptor turns the body into a title + message and shows a Sonner toast, then rejects so callers can handle it too if needed.

This keeps auth, base URL, and error handling in one place and lets new features add only types and request functions/hooks in `types.ts` and `requests.ts`.
