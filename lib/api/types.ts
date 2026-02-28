/**
 * API types. Add endpoint-specific request/response types here as you add endpoints.
 */

/** Global API response shape (e.g. auth endpoints). */
export interface TypeApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

export interface ApiResponse<T = unknown> {
  status: boolean
  message?: string
  data?: T
}

export interface User {
  id: string
  email: string
  name: string
  phone: string | null
  authProvider: string
  authProviderId: string | null
  role: string
  onboardingCompleted: boolean
  emailVerified: boolean
  twoFactorEnabled?: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginResponseData {
  user: User
  token: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
  phone?: string
  countryCode?: string
}

export interface RegisterResponseData {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface VerifyOtpResponseData {
  verified: boolean
  email: string
  userId: string
}

export interface SendOtpPayload {
  email: string
}

export interface CustomFetchConfig {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  timeout?: number
  params?: Record<string, unknown>
  responseType?: "json" | "text" | "blob" | "arraybuffer" | "stream"
  [key: string]: unknown
}

export interface CustomFetchQueryOptions {
  queryKey?: string[] | (() => string[])
  enabled?: boolean | (() => boolean)
  staleTime?: number
  gcTime?: number
  refetchOnWindowFocus?: boolean
  config?: CustomFetchConfig
}

export interface CustomFetchMutationOptions<T = unknown> {
  onSuccess?: (data: ApiResponse<T>) => void
  onError?: (error: unknown) => void
  invalidateQueries?: string[][]
  config?: CustomFetchConfig
}
