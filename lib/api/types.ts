/**
 * API types. Add endpoint-specific request/response types here as you add endpoints.
 */

export interface ApiResponse<T = unknown> {
  status: boolean
  message?: string
  data?: T
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
