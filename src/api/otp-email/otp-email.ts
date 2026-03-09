import { VerifyOtp } from "@/src/types/otp-email";
import { authApi } from "..";

export const otpEmailApi = {
  sendOtp: (email: string) => authApi.post("/api/auth/send-otp", { email }),
  verifyOtp: (body: VerifyOtp) => authApi.post("/api/auth/verify-otp", body),
};
