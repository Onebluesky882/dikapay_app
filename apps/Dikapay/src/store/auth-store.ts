import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getMeApi } from "@/api/otp-email/getMe";
import { otpEmailApi } from "@/api/otp-email/otp-email";
import { User } from "@/types/user.type";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    return storage.getString(key) ?? null;
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

type AuthState = {
  user: User | null;
  email: string | null;
  loading: boolean;
  loadSession: () => Promise<void>;
  loginWithOtp: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      email: null,
      loading: false,

      // 🔐 LOGIN
      loginWithOtp: async (email, otp) => {
        try {
          set({ loading: true });

          const res = await otpEmailApi.verifyOtp({ email, otp });
          const { token, user } = res;

          // 🔐 sensitive → SecureStore
          await SecureStore.setItemAsync("auth-token", token);

          set({ user, email });
        } finally {
          set({ loading: false });
        }
      },

      // 🔄 RESTORE SESSION
      loadSession: async () => {
        try {
          set({ loading: true });
          const email = get().email;
          if (!email) return;
          const res = await getMeApi.getMe(email);

          const { token, user } = res.data ?? res;

          await SecureStore.setItemAsync("auth-token", token);

          set({ user, email });
        } catch (err) {
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      // 🚪 LOGOUT
      logout: async () => {
        try {
          set({ loading: true });

          // 🔒 ลบ token (secure)
          await SecureStore.deleteItemAsync("auth-token");
          useAuthStore.persist.clearStorage();
        } finally {
          set({ user: null, email: null, loading: false });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => mmkvStorage),

      // 👇 persist เฉพาะที่ต้องการ
      partialize: (state) => ({
        email: state.email,
      }),
    },
  ),
);
