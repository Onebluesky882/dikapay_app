import { View, Text } from "react-native";
import React from "react";
import { Menu } from "@/components/homepage/Menu";

export default function homepage() {
  const menu = [
    {
      id: "1",
      icon: "cake",
      name: "ขนม",
    },
    {
      id: "2",
      icon: "restaurant",
      name: "อาหาร",
    },
    {
      id: "3",
      icon: "coffee",
      name: "กาแฟ",
    },
    {
      id: "4",
      icon: "shopping-bag",
      name: "เสื้อผ้า",
    },
    {
      id: "5",
      icon: "shopping-cart",
      name: "ซูเปอร์มาร์เก็ต",
    },
    {
      id: "6",
      icon: "store",
      name: "สะดวกซื้อ",
    },
  ];
  return (
    <View className="m-2 gap-2">
      {/* section 1 banner */}
      <Banner />
      <Menu menu={menu} />
    </View>
  );
}

export const Banner = () => {
  return (
    <View className="border p-2 rounded-sm">
      {/* slice image  */}
      <Text>banner</Text>
    </View>
  );
};
