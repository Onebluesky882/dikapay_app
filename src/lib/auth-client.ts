import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("No API URL defined");
}

export const authClient = createAuthClient({
  baseURL: baseURL, // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: "dikapay",
      storagePrefix: "dikapay",
      storage: SecureStore,
    }),
  ],
});
