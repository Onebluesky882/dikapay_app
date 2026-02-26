import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  plugins: [expo()],
  trustedOrigins: ["dikapay://*"],
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
});
