import { fetch } from "react-native-nitro-fetch";



type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

export function createRequest(baseURL: string) {
  return async function request(path: string, options: RequestOptions = {}) {
    const res = await fetch(baseURL + path, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  };
}
