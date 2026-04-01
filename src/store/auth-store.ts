import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getMeApi } from "../api/otp-email/getMe";
import { otpEmailApi } from "../api/otp-email/otp-email";
import { User } from "../types/user.type";

import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },

  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },

  removeItem: (key: string) => {
    storage.remove(key);
  },
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

          storage.set("user-email", email);
          storage.set("auth-token", token);

          set({ user });
        } finally {
          set({ loading: false });
        }
      },

      loadSession: async () => {
        try {
          set({ loading: true });

          const email = storage.getString("user-email");

          if (!email) {
            set({ user: null });
            return;
          }

          const { data } = await getMeApi.getMe(email);
          const { token, user } = data;

          storage.set("auth-token", token);

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

          storage.remove("user-email");
          storage.remove("auth-token");
        } finally {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
