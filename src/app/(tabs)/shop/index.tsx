import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["อาหาร", "เครื่องดื่ม", "ของหวาน", "สแน็ค", "กาแฟ"];

const shops = [
  { id: "1", name: "ครัวบ้านสวน", rating: 4.7 },
  { id: "2", name: "เสือร้องไห้ Grill", rating: 4.8 },
  { id: "3", name: "ผัดไทโบราณ", rating: 4.6 },
];

const promotions = [
  { id: "1", title: "ลด 20%" },
  { id: "2", title: "ซื้อ 1 แถม 1" },
];

export default function ShopIndex() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔎 All Shops Nearby */}
        <View className="px-4 mt-4">
          <Text className="text-xl font-bold mb-3">ร้านค้าทั้งหมดใกล้คุณ</Text>

          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              onPress={() => router.push(`/(tabs)/shop/${shop.id}`)}
              className="bg-blue-200 p-4 rounded-2xl mb-3 shadow-sm"
            >
              <Text className="text-lg font-semibold">{shop.name}</Text>
              <Text className="text-amber-500 mt-1">⭐ {shop.rating}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🏷 Category Section */}
        <View className="mt-6">
          <Text className="text-xl font-bold px-4 mb-3">หมวดหมู่ร้านค้า</Text>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white px-4 py-2 rounded-full mr-3 shadow-sm">
                <Text className="text-gray-700 font-medium">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 🌟 Recommended */}
        <View className="px-4 mt-6">
          <Text className="text-xl font-bold mb-3">ร้านแนะนำสำหรับคุณ</Text>

          {shops.map((shop) => (
            <View key={shop.id} className="bg-yellow-50 p-4 rounded-2xl mb-3">
              <Text className="font-semibold">{shop.name}</Text>
              <Text className="text-sm text-gray-500">
                เรตติ้ง {shop.rating}
              </Text>
            </View>
          ))}
        </View>

        {/* 🎉 Special */}
        <View className="px-4 mt-6">
          <Text className="text-xl font-bold mb-3">ร้านพิเศษวันนี้</Text>

          <View className="bg-purple-100 p-6 rounded-2xl">
            <Text className="text-lg font-semibold">รับส่วนลดพิเศษ 30%</Text>
            <Text className="text-gray-600 mt-2">เฉพาะร้านที่ร่วมรายการ</Text>
          </View>
        </View>

        {/* 🎟 Promotion */}
        <View className="mt-6">
          <Text className="text-xl font-bold px-4 mb-3">โปรโมชัน</Text>

          <FlatList
            data={promotions}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View className="bg-green-500 px-6 py-3 rounded-2xl mr-3">
                <Text className="text-white font-semibold">{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* 🔥 Hot Deal */}
        <View className="px-4 mt-6 mb-8">
          <Text className="text-xl font-bold mb-3">Hot Deal 🔥</Text>

          <View className="bg-red-100 p-6 rounded-2xl">
            <Text className="text-lg font-semibold text-red-600">
              ดีลร้อนแรงวันนี้
            </Text>
            <Text className="text-gray-600 mt-2">รีบสั่งก่อนหมดเวลา</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
