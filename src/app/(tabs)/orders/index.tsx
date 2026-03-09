import { CartList } from "@/src/components/cart/Cart";
import { RemoveCart } from "@/src/components/cart/RemoveCart";
import { useCartStore } from "@/src/store/Cart/store-order";
import { useShop } from "@/src/store/shop/shop-id";
import { Cart } from "@/src/types/menu.type";
import { mergeCart } from "@/src/utils/cart-utils";
import { getMenuById } from "@/src/utils/getMenuId";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addCartItem);
  const removeItem = useCartStore((state) => state.minusCartItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const shopId = useShop((state) => state.shopId);

  // todo handle if got order can't change shop

  const cartItems: Cart[] = mergeCart(cart)
    .map((item) => {
      const menu = getMenuById(item.menuId);
      if (!menu) return null;
      return {
        ...menu,
        quantity: item.quantity,
        total: menu.price * item.quantity,
      };
    })
    .filter(Boolean) as Cart[];

  const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setConfirmDelete(false);
    router.push("/(tabs)/shop");
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        position: "relative",
        flex: 1,
      }}
    >
      {/* --- Header --- */}
      <View className="  flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <Pressable
            className="mr-3"
            onPress={() => router.push(`/shop/${shopId}`)}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold text-gray-900">ตะกร้าของคุณ</Text>
        </View>
        <View className="items-center flex-row gap-4">
          <Text className="text-gray-500 font-medium">
            {cartItems.length} รายการ
          </Text>
          {cartItems.length > 0 && (
            <Pressable onPress={() => setConfirmDelete(true)}>
              <Ionicons name="trash-bin" size={24} color="red" />
            </Pressable>
          )}
        </View>
      </View>

      {/* --- Cart Items List --- */}
      <CartList
        cartItems={cartItems}
        addItem={addItem}
        removeItem={removeItem}
      />

      {/* --- Footer Summary Section --- */}
      {cartItems.length > 0 && (
        <View className="bg-white px-5 py-4 border-t border-gray-100 shadow-2xl">
          {/* รายละเอียดราคาย่อย */}
          <View className="mb-4 space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-500">ยอดรวมอาหาร</Text>
              <Text className="text-gray-800 font-medium">
                ฿{totalPrice.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">ค่าส่ง</Text>
              <Text className="text-[#00B14F] font-medium">ฟรี</Text>
            </View>
          </View>

          {/* ปุ่มสั่งซื้อ */}
          <Pressable
            className="bg-[#36cd5e] h-14 flex-row items-center justify-between px-6 rounded-xl shadow-md   active:opacity-90"
            onPress={() => router.push("/payment")}
          >
            <View className="flex-row items-center">
              <View className="bg-white/20 px-2 py-1 rounded-md mr-3">
                <Text className="text-white text-xs font-bold">
                  {cartItems.length}
                </Text>
              </View>

              <Text className="text-white text-lg font-bold">สั่งอาหาร</Text>
            </View>

            <View className="flex-row items-center">
              <Text className="text-white text-lg font-bold mr-2">
                ฿{totalPrice.toLocaleString()}
              </Text>
              <AntDesign name="right" size={16} color="white" />
            </View>
          </Pressable>
        </View>
      )}
      {confirmDelete && (
        <RemoveCart
          handleClearCart={handleClearCart}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </SafeAreaView>
  );
}
