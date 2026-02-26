import { api } from "..";

export const getTokenApi = {
  getMe: () => api.get("/api/me"),
};
