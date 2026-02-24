import { Menu } from "@/components/homepage/Menu";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function homepage() {
  const menu = [
    { id: "1", icon: "heart", name: "ขนม" },
    { id: "2", icon: "heart", name: "อาหาร" },
    { id: "3", icon: "heart", name: "กาแฟ" },
    { id: "4", icon: "heart", name: "เสื้อผ้า" },
    { id: "5", icon: "heart", name: "ซูเปอร์มาร์เก็ต" },
    { id: "6", icon: "heart", name: "สะดวกซื้อ" },
  ];
  const [user, setUser] = useState(true);

  const handleTouch = () => {
    if (user) {
      router.push("/(app)/(tabs)");
    } else {
      router.push("/(auth)/sign-in");
      // to login page
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4 gap-4">
        <Banner />

        <Menu menu={menu} checkUser={handleTouch} />
      </View>
    </SafeAreaView>
  );
}

const Banner = () => {
  const balance = 2450.75; // mock dikapay balance

  return (
    <View className="bg-indigo-600 rounded-3xl p-5 shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-lg font-semibold">DikaPay Wallet</Text>
        <Ionicons name="wallet-outline" size={24} color="white" />
      </View>

      {/* Balance */}
      <View className="mt-6">
        <Text className="text-indigo-200 text-sm">ยอดเงินคงเหลือ</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          ฿ {balance.toLocaleString()}
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row justify-between mt-6">
        <ActionButton icon="arrow-up-circle" label="โอนเงิน" />
        <ActionButton icon="arrow-down-circle" label="รับเงิน" />
        <ActionButton icon="qr-code" label="สแกน" />
      </View>
    </View>
  );
};

const ActionButton = ({ icon, label }: { icon: any; label: string }) => {
  return (
    <Pressable className="items-center">
      <View className="bg-white/20 p-3 rounded-full">
        <Ionicons name={icon} size={20} color="white" />
      </View>
      <Text className="text-white text-xs mt-2">{label}</Text>
    </Pressable>
  );
};
