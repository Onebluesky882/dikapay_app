import { authClient } from "@/src/lib/auth-client";
import { create } from "zustand";

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
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  loadSession: async () => {
    try {
      const { data } = await authClient.getSession();

      set({
        user: data?.user ?? null,
        loading: false,
      });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await authClient.signOut();
    } finally {
      set({ user: null });
    }
  },
}));
