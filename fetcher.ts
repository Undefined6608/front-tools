const BASE_URL = (import.meta.env.VUE_APP_API_BASE_PATH || "").replace(
  /\/+$/,
  ""
);

const buildQuery = (
  params?: Record<string, string | number | boolean>
): string => {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }
  return `?${searchParams.toString()}`;
};

const buildHeaders = (
  token?: string,
  headers?: Record<string, string>
): HeadersInit => {
  return {
    "Content-Type": "application/json",
    ...(headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleError = <T>(status: number, message: string): ApiResponse<T> => {
  return {
    data: undefined as unknown as T,
    status,
    ok: false,
    error: message,
  };
};

const parseResponse = async <T>(response: Response): Promise<T | string> => {
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return response.text();
};

const extractErrorMessage = <T>(
  parsed: T | string,
  fallback: string
): string => {
  if (typeof parsed === "string") return parsed;
  if (
    typeof parsed === "object" &&
    parsed !== null &&
    "message" in parsed &&
    typeof (parsed as Record<string, unknown>).message === "string"
  ) {
    return (parsed as { message: string }).message;
  }
  return fallback || "Unknown error";
};

export const fetcher = async <TResponse, TBody = unknown>(
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> => {
  const { method = "GET", headers, body, params, token, signal } = options;

  const url = `${BASE_URL}${endpoint}${buildQuery(params)}`;
  const fetchHeaders = buildHeaders(token, headers);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: fetchHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    return handleError<TResponse>(0, "Network error or request aborted");
  }

  const parsed = await parseResponse<TResponse>(response).catch(() =>
    handleError<TResponse>(response.status, "Failed to parse response")
  );

  if (!response.ok) {
    const errorMessage = extractErrorMessage(parsed, response.statusText);
    return handleError<TResponse>(response.status, errorMessage);
  }

  return {
    data: parsed as TResponse,
    status: response.status,
    ok: true,
  };
};
