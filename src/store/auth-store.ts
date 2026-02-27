import * as SecureStore from "expo-secure-store";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getMeApi } from "../api/otp-email/getMe";
import { otpEmailApi } from "../api/otp-email/otp-email";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  loadSession: () => Promise<void>;
  loginWithOtp: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      loginWithOtp: async (email, otp) => {
        try {
          set({ loading: true });

          const { data } = await otpEmailApi.verifyOtp({ email, otp });
          const { token, user } = data;

          await SecureStore.setItemAsync("user-email", email);
          await SecureStore.setItemAsync("auth-token", token);

          set({ user });
        } finally {
          set({ loading: false });
        }
      },

      loadSession: async () => {
        try {
          set({ loading: true });

          const email = await SecureStore.getItemAsync("user-email");

          if (!email) {
            set({ user: null });
            return;
          }

          const { data } = await getMeApi.getMe(email);
          const { token, user } = data;

          await SecureStore.setItemAsync("auth-token", token);

          set({ user });
        } catch {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });

          await SecureStore.deleteItemAsync("user-email");
          await SecureStore.deleteItemAsync("auth-token");
        } finally {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user, // 👈 persist แค่ user
      }),
      storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
      })),
    },
  ),
);
