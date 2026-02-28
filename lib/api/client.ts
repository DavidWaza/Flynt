"use client";

import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ApiResponse,
  CustomFetchConfig,
  CustomFetchQueryOptions,
  CustomFetchMutationOptions,
} from "./types";

const getBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL ?? "";

/** Plug in cookie/store later when auth is added. */
const getToken = (): string | null => null;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 300000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          toast.error("Unauthorized. Please sign in again.");
          break;
        case 403:
          toast.error("Access Denied");
          break;
        case 404:
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          toast.error("Server Error. Please try again later.");
          break;
        default:
          break;
      }
    } else if (error.request) {
      toast.error("Network Error");
    }
    return Promise.reject(error);
  }
);

export async function customFetch<T = unknown>(
  url: string,
  options: CustomFetchConfig = {}
): Promise<T> {
  const config: CustomFetchConfig = {
    ...options,
    headers: { ...options.headers },
  };
  const method = (config.method ?? "get").toLowerCase();
  switch (method) {
    case "get":
      return (await axiosInstance.get<T>(url, config)).data;
    case "post":
      return (await axiosInstance.post<T>(url, config.body, config)).data;
    case "patch":
      return (await axiosInstance.patch<T>(url, config.body, config)).data;
    case "put":
      return (await axiosInstance.put<T>(url, config.body, config)).data;
    case "delete":
      return (await axiosInstance.delete<T>(url, config)).data;
    default:
      return (await axiosInstance.request<T>({ ...config, url })).data;
  }
}

export function useCustomFetchQuery<T = unknown>(
  url: string | (() => string),
  options: CustomFetchQueryOptions = {}
) {
  const baseUrl = getBaseUrl();
  const queryKey =
    typeof options.queryKey === "function"
      ? options.queryKey()
      : options.queryKey ?? (typeof url === "function" ? [] : [url]);
  const enabled =
    typeof options.enabled === "function"
      ? options.enabled()
      : options.enabled ?? true;

  return useQuery({
    queryKey,
    queryFn: async (): Promise<ApiResponse<T>> => {
      const currentUrl = typeof url === "function" ? url() : url;
      try {
        const fullUrl = `${baseUrl}${currentUrl}`;
        const config = { ...options.config, headers: options.config?.headers };
        const response = await axiosInstance.get<ApiResponse<T>>(fullUrl, config);
        return response.data;
      } catch (err) {
        const header =
          (Array.isArray(queryKey) && queryKey.find((k) => typeof k === "string" && !String(k).includes("-"))) ??
          queryKey[0] ??
          "Error fetching data";
        toast.error(String(header));
        return {
          status: false,
          message: "Error fetching data",
          data: undefined,
        };
      }
    },
    enabled,
    staleTime: options.staleTime ?? 1000 * 60,
    gcTime: options.gcTime ?? 1000 * 60,
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
  });
}

export function useCustomFetchMutation<T = unknown>(
  url: string | (() => string),
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  options: CustomFetchMutationOptions<T> = {}
) {
  const baseUrl = getBaseUrl();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body?: unknown): Promise<ApiResponse<T>> => {
      const currentUrl = typeof url === "function" ? url() : url;
      const fullUrl = `${baseUrl}${currentUrl}`;
      const config = { ...options.config, headers: options.config?.headers };
      let response;
      switch (method) {
        case "POST":
          response = await axiosInstance.post<ApiResponse<T>>(fullUrl, body, config);
          break;
        case "PUT":
          response = await axiosInstance.put<ApiResponse<T>>(fullUrl, body, config);
          break;
        case "PATCH":
          response = await axiosInstance.patch<ApiResponse<T>>(fullUrl, body, config);
          break;
        case "DELETE":
          response = await axiosInstance.delete<ApiResponse<T>>(fullUrl, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return response.data;
    },
    onSuccess: (data) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });

  const mutateAsync = (body?: unknown): Promise<ApiResponse<T>> =>
    new Promise((resolve, reject) => {
      mutation.mutate(body, {
        onSuccess: resolve,
        onError: reject,
      });
    });

  return {
    ...mutation,
    mutateAsync,
    mutateSync: mutation.mutate,
  };
}

export function createQueryKey(
  baseKey: string,
  params?: Record<string, unknown>
): (string | Record<string, unknown>)[] {
  if (!params) return [baseKey];
  return [baseKey, params];
}
