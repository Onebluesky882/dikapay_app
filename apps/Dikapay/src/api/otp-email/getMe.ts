import { createRequest } from "..";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH!;

if (!AUTH_URL) {
  throw new Error("No API AUTH_URL defined");
}

const authRequest = createRequest(AUTH_URL);

export const getMeApi = {
  getMe: (email: string) =>
    authRequest("/api/me", {
      method: "POST",
      body: { email },
    }),
};
