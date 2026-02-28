/**
 * Define new API requests here; add request/response types in lib/api/types.ts.
 */

import {
  customFetch,
  useCustomFetchQuery,
  useCustomFetchMutation,
  createQueryKey,
} from "./client";
import type { ApiResponse, TypeApiResponse, User, LoginResponseData, RegisterPayload, RegisterResponseData } from "./types";

/** Example: GET /example - add response type in types.ts when you have a real endpoint */
export const EXAMPLE_QUERY_KEY = "example";

export function useExampleQuery() {
  return useCustomFetchQuery<{ id: string; name: string }>("/example", {
    queryKey: [EXAMPLE_QUERY_KEY],
  });
}

/** Example: POST /example - add request/response types in types.ts when you have a real endpoint */
export function useCreateExampleMutation() {
  return useCustomFetchMutation<{ id: string }>("/example", "POST", {
    invalidateQueries: [[EXAMPLE_QUERY_KEY]],
  });
}

/** Example: raw fetch (e.g. for server or one-off calls) */
export async function getExample(): Promise<ApiResponse<{ id: string; name: string }>> {
  return customFetch<ApiResponse<{ id: string; name: string }>>("/example", {
    method: "get",
  });
}

/** POST /auth/login */
export async function loginRequest(body: {
  email: string
  password: string
}): Promise<TypeApiResponse<LoginResponseData>> {
  return customFetch<TypeApiResponse<LoginResponseData>>("/auth/login", {
    method: "post",
    body,
  });
}

/** GET /auth/me */
export async function getCurrentUser(): Promise<TypeApiResponse<{ user: User }>> {
  return customFetch<TypeApiResponse<{ user: User }>>("/auth/me", {
    method: "get",
  });
}

/** POST /auth/register */
export async function registerRequest(body: RegisterPayload): Promise<TypeApiResponse<RegisterResponseData>> {
  return customFetch<TypeApiResponse<RegisterResponseData>>("/auth/register", {
    method: "post",
    body,
  });
}

export { createQueryKey };
