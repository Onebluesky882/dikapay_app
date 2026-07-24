// Shapes returned by the real apps/api backend (packages/db) — distinct from the mock
// Shop/Menu/Table types in shop.type.ts / menu.type.ts, which back the separate mock
// "browse nearby shops" flow and don't match this API's field names.

export type ScannedTable = {
  tableId: string;
  tableNumber: number;
  seats: number;
  shopId: string;
  shopName: string;
  shopSlug: string;
};

export type ModifierOption = {
  id: string;
  modifierGroupId: string;
  name: string;
  priceDelta: number; // satang
};

export type ModifierGroup = {
  id: string;
  menuItemId: string;
  name: string;
  selectionType: "single" | "multiple";
  isRequired: boolean;
  options: ModifierOption[];
};

export type RealMenuItem = {
  id: string;
  shopId: string;
  name: string;
  basePrice: number; // satang
  description: string | null;
  isActive: boolean;
  modifierGroups: ModifierGroup[];
};
