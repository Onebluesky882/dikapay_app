import { authApi } from "..";

export const getMeApi = {
  getMe: (email: string) => authApi.post("/api/me", { email }),
};
