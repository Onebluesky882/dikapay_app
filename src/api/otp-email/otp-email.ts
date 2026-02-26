import { VerifyOtp } from "@/src/types/otp-email";
import { api } from "..";

export const otpEmailApi = {
  sendOtp: (email: string) => api.post("/api/auth/send-otp", { email }),
  verifyOtp: (body: VerifyOtp) => api.post("/api/auth/verify-otp", body),
  getMe: () => api.get("/api/me"),
};
