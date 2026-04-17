import { homeMenus } from "@/mocks/menu-homepage.mock";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function MenuIcon() {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {homeMenus.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              width: "22%", // 👈 4 ช่อง
              aspectRatio: 1,
              backgroundColor: "#F0FDF4",
              marginTop: 12,

              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            }}
            onPress={() => console.log(item.title)}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={24}
              color="#16a34a"
            />

            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
