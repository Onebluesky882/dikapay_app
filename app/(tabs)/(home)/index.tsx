import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    image: "https://picsum.photos/800/400?food1",
  },
  {
    id: "2",
    image: "https://picsum.photos/800/400?food2",
  },
];

const menus = [
  { id: "1", name: "ผัดไท", price: "฿69" },
  { id: "2", name: "ข้าวผัด", price: "฿59" },
  { id: "3", name: "สเต็กหมู", price: "฿129" },
  { id: "4", name: "ชาไทย", price: "฿35" },
];

const promotions = [
  { id: "1", title: "ซื้อ 1 แถม 1", desc: "เฉพาะเมนูผัดไท" },
  { id: "2", title: "ลด 20%", desc: "เมื่อสั่งครบ 300 บาท" },
];

export default function HomePage() {
  const SPACING = 12;
  const ITEM_WIDTH = width - SPACING * 2; // 👈 หัก padding ซ้ายขวา
  return (
    <ScrollView className="flex-1 bg-white ">
      {/* 🔥 Banner */}
      <View style={{ paddingHorizontal: 2, paddingLeft: 8 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + 8} // 👈 ต้องรวม marginRight
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

      {/* 🍜 Menu Section */}
      <View className="px-4 mt-6">
        <Text className="text-xl font-bold mb-4">เมนูยอดนิยม</Text>

        <FlatList
          data={menus}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-orange-50 rounded-2xl p-4 mb-4 w-[48%]">
              <Text className="text-lg font-semibold text-amber-900">
                {item.name}
              </Text>
              <Text className="text-orange-600 mt-2">{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 🎉 Promotion Section */}
      <View className="px-4 mt-4 mb-10">
        <Text className="text-xl font-bold mb-4">โปรโมชั่น</Text>

        {promotions.map((item) => (
          <View key={item.id} className="bg-amber-100 p-4 rounded-2xl mb-3">
            <Text className="font-semibold text-amber-900">{item.title}</Text>
            <Text className="text-amber-700 mt-1">{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
