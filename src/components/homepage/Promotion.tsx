import { promotions } from "@/src/mocks/home.mock";
import React from "react";
import { Text, View } from "react-native";

export default function Promotion() {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>
        โปรโมชั่น
      </Text>

      {promotions.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "#fef3c7",
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#92400e" }}>
            {item.title}
          </Text>
          <Text style={{ marginTop: 6, color: "#78350f" }}>{item.desc}</Text>
        </View>
      ))}
    </View>
  );
}
