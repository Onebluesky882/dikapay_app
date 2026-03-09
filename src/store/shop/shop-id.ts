import { create } from "zustand";

type ShopState = {
  shopId: string | null;
  setShop: (id: string) => void;
  clearShop: () => void;
};

export const useShop = create<ShopState>((set) => ({
  shopId: null,
  setShop: (id) => set({ shopId: id }),
  clearShop: () => set({ shopId: null }),
}));
