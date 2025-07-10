// types/http.d.ts

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  params?: Record<string, string | number | boolean>;
  token?: string;
  signal?: AbortSignal;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
  error?: string;
}
