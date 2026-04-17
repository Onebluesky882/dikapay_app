import { shops } from "@/mocks/shop.mock";
import { useCartStore } from "@/store/Cart/store-order";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#00B14F";

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const minusCartItem = useCartStore((state) => state.minusCartItem);

  const matchShop = shops.find((shop) => shop.id == id);

  // States
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  if (!matchShop) return null;

  // กรองหมวดหมู่
  const categories = [
    "ทั้งหมด",
    ...new Set(matchShop.menus.map((m) => m.category)),
  ];

  let filteredMenus;

  if (selectedCategory === "ทั้งหมด") {
    filteredMenus = matchShop.menus;
  } else {
    filteredMenus = matchShop.menus.filter(
      (m) => m.category === selectedCategory,
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View className="  bg-white">
        {/* --- Custom Header --- */}
        <View className="px-4 pt-4 pb-2 border-b border-gray-100 flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">
              {matchShop.name}
            </Text>
            <View className="flex-row items-center">
              <AntDesign name="star" size={14} color="#FFD700" />
              <Text className="text-gray-500 ml-1 text-xs">
                {matchShop.rating} • 12800 total orders
              </Text>
            </View>
          </View>
        </View>
        {/* --- Category Tabs --- */}
        <View className="bg-white">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-3"
            contentContainerStyle={{ gap: 10 }}
          >
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full border ${
                  selectedCategory === cat
                    ? "bg-[#00B14F] border-[#00B14F]"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-bold text-sm ${selectedCategory === cat ? "text-white" : "text-gray-500"}`}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* --- Menu List --- */}
        <FlatList
          data={filteredMenus}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          renderItem={({ item }) => {
            const itemQty = cart
              .filter((c) => c.menuId === item.id)
              .reduce((t, c) => t + c.quantity, 0);
            return (
              <View className="flex-row justify-between items-center py-4 border-b border-gray-50">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-bold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-gray-400 text-sm mt-1">
                    ฿{item.price}
                  </Text>
                  {Boolean(item.options?.length) && (
                    <View className="flex-row items-center mt-1">
                      <Feather name="plus-circle" size={10} color="#00B14F" />
                      <Text className="text-[#00B14F] text-[10px] ml-1 font-medium">
                        มีตัวเลือกเพิ่มเติม
                      </Text>
                    </View>
                  )}
                </View>
                <View className="items-center">
                  {itemQty > 0 ? (
                    <View className="flex-row items-center bg-gray-50 rounded-full border border-gray-100 p-1">
                      <Pressable onPress={() => minusCartItem(item.id)}>
                        <AntDesign
                          name="minus-circle"
                          size={24}
                          color={GREEN}
                        />
                      </Pressable>
                      <Text className="mx-3 font-bold text-base">
                        {itemQty}
                      </Text>
                      <Pressable onPress={() => addCartItem(item.id)}>
                        <AntDesign name="plus-circle" size={24} color={GREEN} />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => addCartItem(item.id)}
                      className="border border-[#00B14F] rounded-lg px-4 py-1"
                    >
                      <Text className="text-[#00B14F] font-bold">เพิ่ม</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
