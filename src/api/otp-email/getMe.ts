import { api } from "..";

export const getMeApi = {
  getMe: (email: string) => api.post("/api/me", {email}),
};
