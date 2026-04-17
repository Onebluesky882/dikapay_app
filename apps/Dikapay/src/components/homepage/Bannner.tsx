import { banners } from "@/mocks/home.mock";
import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";

export default function Banner() {
  const { width } = Dimensions.get("window");
  const SPACING = 12;
  const ITEM_WIDTH = width - SPACING * 2;
  return (
    <View style={{ paddingLeft: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 8}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {banners.map((item) => (
          <View
            key={item.id}
            style={{
              width: ITEM_WIDTH,
              height: 180,
              marginRight: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
