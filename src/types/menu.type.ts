export type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
  menuAvailable: boolean;
  tables: Table[];
  shopId?: string;
};
type Option = {
  optionAvailable: boolean;
  id: string;
  name: string;
  size: string;
  extraPrice: number;
  amount: number;
};

export type Cart = Menu & {
  quantity: number;
  options?: Option[];
  total: number;
};
export type Table = {
  id: string;
  tableCode: string;
  seat: number;
  status: "available" | "occupied";
};
