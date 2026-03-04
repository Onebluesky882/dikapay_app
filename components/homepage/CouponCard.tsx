import { promotions } from "@/src/mocks/home.mock";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export const CouponCard = () => {
  return (
    <View>
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>คูปองสำหรับคุณ</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {promotions.map((item) => (
          <View
            key={item.id}
            style={{
              height: 34,
              paddingHorizontal: 18,
              borderRadius: 50,
              marginRight: 12,
              justifyContent: "center",
              backgroundColor: "#16a34a",
              elevation: 3,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
