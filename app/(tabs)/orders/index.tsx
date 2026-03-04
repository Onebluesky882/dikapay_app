import { useCartStore } from "@/src/store/Order/store-order";
import { getMenuById } from "@/src/utils/getMenuId";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const cart = useCartStore((state) => state.cart);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const minusCartItem = useCartStore((state) => state.minusCartItem);

  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.menuId}
          renderItem={({ item }) => {
            const menu = getMenuById(item.menuId);
            console.log("menu :", menu);
            return <Text>{menu?.name}</Text>;
          }}
        />
        <Text> จำนวนทั้งหมด {cartItems} ชิ้น</Text>
      </View>
    </SafeAreaView>
  );
}
