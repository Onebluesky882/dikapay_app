import { shops } from "@/src/mocks/shop.mock";
import { useCartStore } from "@/src/store/Cart/store-order";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cart = useCartStore((state) => state.cart);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const minusCartItem = useCartStore((state) => state.minusCartItem);
  const matchShop = shops.find((shop) => shop.id == id);
  if (!matchShop) return null;

  console.log("cart", cart);
  return (
    <View className="relative" style={{ flex: 1, padding: 16 }}>
      {/* Header ร้าน */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {matchShop.name}
        </Text>
        <Text style={{ color: "gray" }}>⭐ {matchShop.rating}</Text>
      </View>

      <FlatList
        data={matchShop.menus}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => {
          const itemQty = cart
            .filter((c) => c.menuId === item.id)
            .reduce((t, c) => t + c.quantity, 0);

          return (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.name}
              </Text>

              <Text style={{ color: "gray", marginVertical: 4 }}>
                ฿{item.price}
              </Text>

              {item.options && (
                <Text style={{ fontSize: 12, color: "#888" }}>
                  มีตัวเลือกเพิ่มเติม
                </Text>
              )}

              {/* ปุ่มควบคุม */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => minusCartItem(item.id, item.options?.[0]?.id)}
                >
                  <AntDesign name="minus-circle" size={28} color="red" />
                </Pressable>

                <Text
                  style={{
                    marginHorizontal: 15,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {itemQty}
                </Text>

                <Pressable
                  onPress={() => addCartItem(item.id, item.options?.[0]?.id)}
                >
                  <AntDesign name="plus-circle" size={28} color="green" />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
