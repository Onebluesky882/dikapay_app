export type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
  menuAvailable: boolean;
  tables: Table[];
};
type Option = {
  optionAvailable: boolean;
  id: string;
  name: string;
  size: string;
  extraPrice: number;
  amount: number;
};

export type MenuOption = Menu & {
  options?: Option[];
};
export type Table = {
  id: string;
  tableCode: string;
  seat: number;
  status: "available" | "occupied";
};
