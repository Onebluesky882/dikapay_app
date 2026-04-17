import { shops } from "../mocks/shop.mock";

export const getMenuById = (id: string) => {
  for (const shop of shops) {
    const menu = shop.menus.find((m) => m.id === id);
    if (menu) return menu;
  }
  return undefined;
};
