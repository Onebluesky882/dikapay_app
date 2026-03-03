import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
};
type Option = {
  id: string;
  name: string;
  size: string;
  extraPrice: number;
  amount: number;
};

type MenuOption = Menu & {
  options?: Option[];
};

type CartItem = {
  menuId: string;
  optionId?: string;
  quantity: number;
};

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("shop id :", id);

  const shops = [
    {
      id: "1",
      name: "ครัวบ้านสวน",
      rating: 4.7,
      menus: [
        {
          id: "m1",
          name: "ข้าวผัดไก่",
          price: 40,
          category: "อาหารจานเดียว",
        },
        {
          id: "m2",
          name: "ข้าวผัดเนื้อ",
          price: 60,
          category: "อาหารจานเดียว",
        },
        {
          id: "m3",
          name: "ผัดไทกุ้งสด",
          price: 70,
          category: "เส้น",
        },
        {
          id: "m4",
          name: "ไข่ราวา",
          price: 25,
          category: "ท็อปปิ้ง",
        },
        {
          id: "m5",
          name: "ชาไทย",
          price: 35,
          category: "เครื่องดื่ม",
        },
      ],
    },
  ];

  const matchShop = shops.find((shop) => shop.id == id);
  if (!matchShop) return null;

  const [cart, setCart] = useState<Menu | null>(null);

  const getMenuById = (id: string) => {
    return shops.find((menu) => (menu.id == id ? { ...menu } : null));
  };
  type MenuId = Pick<Menu, "id">;
  const addCart = (id: MenuId) => {
    getMenuById(id as unknown as string);
    return;
  };
  return (
    <View>
      <View key={matchShop.id}>
        <Text>{matchShop.name}</Text>
      </View>

      <FlatList
        data={matchShop.menus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
