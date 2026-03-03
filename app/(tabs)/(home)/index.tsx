import { router } from "expo-router";
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
  {
    id: "3",
    image: "https://picsum.photos/800/400?food3",
  },
  {
    id: "4",
    image: "https://picsum.photos/800/400?food2",
  },
];

const recommendedShops = [
  {
    id: "1",
    name: "ครัวบ้านสวน",
    category: "อาหารตามสั่ง",
    rating: 4.7,
    image: "https://picsum.photos/400/300?restaurant1",
  },
  {
    id: "2",
    name: "เสือร้องไห้ Grill",
    category: "สเต็ก & เนื้อย่าง",
    rating: 4.8,
    image: "https://picsum.photos/400/300?restaurant2",
  },
  {
    id: "3",
    name: "ผัดไทโบราณ",
    category: "ก๋วยเตี๋ยว & ผัดไทย",
    rating: 4.6,
    image: "https://picsum.photos/400/300?restaurant3",
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

const handleShopRouter = (id: string) => {
  console.log(" id : ", id);
  router.push(`/shop/${id}`);
};
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
      <View className="mt-6">
        <View className="px-5 mb-3">
          <Text className="text-2xl font-bold text-gray-900">
            คูปองสำหรับคุณ
          </Text>
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
                height: 30,
                paddingHorizontal: 18,
                borderRadius: 50,
                marginRight: 12,
                justifyContent: "center",
                backgroundColor: "#16a34a",

                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
              }}
            >
              <Text className="text-white text-sm font-semibold">
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="mt-2    pb-2">
        <View className="px-4 mb-2">
          <Text className="text-xl font-bold">ร้านค้าแนะนำใกล้คุณ</Text>
        </View>
        <View>
          <FlatList
            data={recommendedShops}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingVertical: 1,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white rounded-2xl mr-4 shadow"
                style={{ width: 220 }}
                onPress={() => handleShopRouter(item.id as unknown as string)}
              >
                {/* รูปภาพ */}
                <View className="h-32 rounded-t-2xl  overflow-hidden   ">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* ข้อมูลร้าน */}
                <View className="p-3">
                  <Text className="font-semibold text-base text-gray-900">
                    {item.name}
                  </Text>

                  <Text className="text-gray-500 text-sm mt-1">
                    {item.category}
                  </Text>

                  <Text className="text-amber-500 text-sm mt-2">
                    ⭐ {item.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* 🍜 Menu Section */}
      <View className="px-4 ">
        <Text className="text-xl font-bold mb-4">เมนูฮิต ติดกระแสวันนี้</Text>

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
        <Text className="text-xl font-bold mb-4">จับคู่สุดคุ้ม</Text>

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
