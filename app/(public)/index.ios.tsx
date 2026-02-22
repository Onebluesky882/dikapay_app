import { View, Text } from "react-native";
import React from "react";
import { Menu } from "@/components/homepage/Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { Host } from "@expo/ui/swift-ui";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";

export default function homepage() {
  console.log("Liquid Glass:", isLiquidGlassAvailable());
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
  const isGlassAvailable = isLiquidGlassAvailable();
  return (
    <>
      {isGlassAvailable && (
        <GlassView
          style={{
            position: "absolute",
            top: 100,
            right: 20,
            borderRadius: 20,
            padding: 16,
            width: 200,
          }}
        >
          <Text>Custom Glass Menu</Text>
        </GlassView>
      )}
    </>
  );
};
