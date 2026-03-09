import { menus } from "@/src/mocks/home.mock";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
export const MenuSuggestion = () => {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>
        เมนูฮิต ติดกระแสวันนี้
      </Text>

      <FlatList
        data={menus}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff7ed",
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              width: "48%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#92400e",
              }}
            >
              {item.name}
            </Text>
            <Text style={{ color: "#ea580c", marginTop: 12 }}>
              {item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
