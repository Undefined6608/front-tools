// utils/request.ts
import { fetcher } from "./fetcher";

export const getApi = <T>(
  url: string,
  params?: Params,
  options?: Omit<RequestOptions, "method" | "params">
): Promise<ApiResponse<T>> => {
  return fetcher<T>(url, {
    ...options,
    method: "GET",
    params,
  });
};

export const postApi = <T, B = unknown>(
  url: string,
  body: B,
  options?: Omit<RequestOptions<B>, "method" | "body">
): Promise<ApiResponse<T>> => {
  return fetcher<T, B>(url, {
    ...options,
    method: "POST",
    body,
  });
};

export const putApi = <T, B = unknown>(
  url: string,
  body: B,
  options?: Omit<RequestOptions<B>, "method" | "body">
): Promise<ApiResponse<T>> => {
  return fetcher<T, B>(url, {
    ...options,
    method: "PUT",
    body,
  });
};

export const delApi = <T>(
  url: string,
  params?: Params,
  options?: Omit<RequestOptions, "method" | "params">
): Promise<ApiResponse<T>> => {
  return fetcher<T>(url, {
    ...options,
    method: "DELETE",
    params,
  });
};
