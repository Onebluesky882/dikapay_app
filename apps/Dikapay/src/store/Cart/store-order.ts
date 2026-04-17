import { CartItem } from "@/types/cart.type";
import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const storage = createMMKV();

const mmkvStorage = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.remove(key),
};

type CartState = {
  cart: CartItem[];
  addCartItem: (menuId: string, optionId?: string) => void;
  minusCartItem: (menuId: string, optionId?: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addCartItem: (menuId, optionId) => {
        const cart = get().cart;
        const existingItem = cart.find(
          (item) => item.menuId === menuId && item.optionId === optionId,
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.menuId === menuId && item.optionId === optionId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            cart: [...cart, { menuId, optionId, quantity: 1 }],
          });
        }
      },

      minusCartItem: (menuId) => {
        const cart = get().cart;

        const existingItem = cart.find((item) => item.menuId === menuId);

        if (!existingItem) return;

        if (existingItem.quantity === 1) {
          set({
            cart: cart.filter((item) => item.menuId !== menuId),
          });
        } else {
          set({
            cart: cart.map((item) =>
              item.menuId === menuId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        }
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "dikapay-cart",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
