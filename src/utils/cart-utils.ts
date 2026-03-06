import { CartItem } from "../types/cart.type";

export const mergeCart = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    const exist = acc.find((i) => i.menuId === item.menuId);

    if (exist) {
      exist.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, [] as CartItem[]);
};
