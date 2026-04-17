import { VerifyOtp } from "@/types/otp-email";
import { createRequest } from "..";
const AUTH_URL = process.env.EXPO_PUBLIC_AUTH!;

if (!AUTH_URL) {
  throw new Error("No API AUTH_URL defined");
}

const authRequest = createRequest(AUTH_URL);
export const otpEmailApi = {
  sendOtp: (email: string) =>
    authRequest("/api/auth/send-otp", { method: "POST", body: { email } }),
  verifyOtp: (body: VerifyOtp) =>
    authRequest("/api/auth/verify-otp", { method: "POST", body }),
};
