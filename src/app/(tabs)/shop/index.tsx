import { useShop } from "@/src/store/shop/shop-id";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: "1", name: "อาหารไทย", icon: "🍱" },
  { id: "2", name: "เครื่องดื่ม", icon: "🥤" },
  { id: "3", name: "ของหวาน", icon: "🍰" },
  { id: "4", name: "สแน็ค", icon: "🍟" },
  { id: "5", name: "กาแฟ", icon: "☕" },
  { id: "6", name: "สุขภาพ", icon: "🥗" },
];

const shops = [
  {
    id: "1",
    name: "ไฉไลตามสั่ง",
    rating: 4.7,
    distance: "1.2 km",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "เสือร้องไห้ Grill",
    rating: 4.8,
    distance: "0.8 km",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "ผัดไทโบราณ",
    rating: 4.6,
    distance: "2.5 km",
    image: "https://via.placeholder.com/150",
  },
];

const promotions = [
  { id: "1", title: "ลด 20%" },
  { id: "2", title: "ซื้อ 1 แถม 1" },
  { id: "3", title: "ส่งฟรี 0.-" },
];

export default function ShopIndex() {
  const setShop = useShop((state) => state.setShop);

  const handleRouterShop = (id: string) => {
    setShop(id);
    router.push(`/(tabs)/shop/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Grid */}
        {/* Category Horizontal Menu */}
        <View className="py-4 bg-gray-50">
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity className="items-center mr-4">
                <View className="w-14 h-14 bg-gray-100 rounded-2xl items-center justify-center mb-1">
                  <Text className="text-2xl">{item.icon}</Text>
                </View>
                <Text className="text-xs font-medium text-gray-700">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="h-1 bg-gray-100" />

        {/* Promotion Slider */}
        <View className="py-5">
          <Text className="text-lg font-bold px-4 mb-3">โปรโมชันแรงวันนี้</Text>

          <FlatList
            data={promotions}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-green-500 w-64 h-28 rounded-2xl mr-3 p-4 justify-end">
                <Text className="text-white text-xl font-bold">
                  {item.title}
                </Text>
                <Text className="text-white/80 text-xs">
                  เฉพาะสั่งผ่านแอปเท่านั้น
                </Text>
              </View>
            )}
          />
        </View>

        <View className="h-1 bg-gray-100" />

        {/* Recommended Shops */}
        <View className="px-4 py-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">
              ร้านค้าแนะนำใกล้คุณ
            </Text>

            <TouchableOpacity>
              <Text className="text-green-600 font-semibold text-sm">
                ดูทั้งหมด
              </Text>
            </TouchableOpacity>
          </View>

          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              onPress={() => handleRouterShop(shop.id)}
              className="flex-row mb-6"
            >
              {/* Image */}
              <Image
                source={{ uri: shop.image }}
                className="w-24 h-24 rounded-xl"
                resizeMode="cover"
              />

              {/* Shop Info */}
              <View className="flex-1 ml-4 justify-center">
                <Text
                  className="text-base font-bold text-gray-900 mb-1"
                  numberOfLines={1}
                >
                  {shop.name}
                </Text>

                <View className="flex-row items-center mb-1">
                  <Text className="text-amber-500 text-sm">
                    ⭐ {shop.rating}
                  </Text>
                  <Text className="text-gray-400 text-xs ml-2">
                    ({shop.distance})
                  </Text>
                </View>

                <View className="flex-row">
                  <View className="bg-green-50 px-2 py-0.5 rounded border border-green-100">
                    <Text className="text-green-600 text-[10px] font-bold">
                      ส่งฟรี
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
