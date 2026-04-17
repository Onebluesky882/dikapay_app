import { useCartStore } from "@/store/Cart/store-order";
import { Cart } from "@/types/menu.type";
import { mergeCart } from "@/utils/cart-utils";
import { getMenuById } from "@/utils/getMenuId";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const [method, setMethod] = useState<"cash" | "scan">("cash");

  const cart = useCartStore((state) => state.cart);

  const cartMenu: Cart[] = mergeCart(cart)
    .map((item) => {
      const menu = getMenuById(item.menuId);
      if (!menu) return null;
      return {
        ...menu,
        quantity: item.quantity,
        total: menu?.price ?? 0 * item.quantity,
      };
    })
    .filter(Boolean) as Cart[];

  const totalPrice = cartMenu.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <Pressable onPress={() => router.push("/(tabs)/orders")}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text className="text-lg font-bold ml-3">ชำระเงิน</Text>
      </View>

      <ScrollView className="mb-16">
        {/* ร้านค้า */}
        <View className="bg-white px-4 py-4 mt-1">
          <Text className="text-gray-800 font-bold text-base">ร้านค้า</Text>

          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons
              name="storefront-outline"
              size={22}
              color="#00B14F"
            />
            <Text className="ml-2 text-gray-600">ร้านอาหารตามสั่งลุงชัย</Text>
          </View>
          <Text>ยอดที่ต้องชำระ : {totalPrice}</Text>
        </View>

        {/* เลือกวิธีจ่าย */}
        <View className="bg-white px-4 py-4 mt-1">
          <Text className="font-bold text-gray-800 mb-3">เลือกวิธีจ่าย</Text>

          {/* เงินสด */}
          <Pressable
            onPress={() => setMethod("cash")}
            className={`flex-row items-center justify-between p-3 rounded-xl border mb-3 ${
              method === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="cash" size={22} />
              <Text className="ml-3 text-gray-800 font-medium">เงินสด</Text>
            </View>

            {method === "cash" && (
              <Ionicons name="checkmark-circle" size={20} color="#00B14F" />
            )}
          </Pressable>

          {/* Scan */}
          <Pressable
            onPress={() => setMethod("scan")}
            className={`flex-row items-center justify-between p-3 rounded-xl border ${
              method === "scan"
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="qrcode-scan" size={22} />
              <Text className="ml-3 text-gray-800 font-medium">สแกนจ่าย</Text>
            </View>

            {method === "scan" && (
              <Ionicons name="checkmark-circle" size={20} color="#00B14F" />
            )}
          </Pressable>

          <Text className="text-gray-400 text-xs mt-2">
            *ยอดโอนเข้าบัญชีร้านค้าโดยตรง
          </Text>
        </View>

        {/* QR Code */}
        {method === "scan" && (
          <View className="bg-white px-4 py-5 mt-1 items-center">
            <Text className="font-semibold text-gray-800 mb-3">
              สแกน QR เพื่อชำระเงิน
            </Text>

            <Image
              source={{
                uri: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=shop-payment",
              }}
              className="w-52 h-52 rounded-xl"
            />

            <Text className="text-gray-400 text-sm mt-3">
              กรุณาโอนเงินแล้วแนบสลิปด้านล่าง
            </Text>
          </View>
        )}

        {/* Upload Slip */}
        {method === "scan" && (
          <View className="bg-white px-4 py-4 mt-1">
            <Text className="font-semibold text-gray-800 mb-3">
              แนบสลิปการโอน
            </Text>

            <Pressable className="border-2 border-dashed border-gray-300 rounded-xl h-28 items-center justify-center">
              <Ionicons name="cloud-upload-outline" size={26} color="gray" />
              <Text className="text-gray-400 mt-1">อัปโหลดสลิป</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      {/* confirm */}
      <View className="bg-white px-4 py-4 border-t border-gray-200  ">
        <Pressable
          className="bg-[#00B14F] h-14 rounded-xl items-center justify-center"
          onPress={() => console.log("payment success")}
        >
          <Text className="text-white text-lg font-bold">ยืนยัน</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
