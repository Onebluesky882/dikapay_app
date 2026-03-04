import HomeHeader from "@/components/homepage/HomeHeader";
import {
  banners,
  menus,
  promotions,
  recommendedShops,
} from "@/src/mocks/home.mock";
import { useAuthStore } from "@/src/store/auth-store";
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
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const SPACING = 12;
  const ITEM_WIDTH = width - SPACING * 2;

  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const handleShopRouter = (id: string) => {
    router.push(`/shop/${id}`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* a0ff8c */}
      <SafeAreaView
        style={{
          backgroundColor: "#a0ff8c",
          paddingBottom: -100,
          marginTop: -80,
        }}
      >
        {/* HEADER */}
        <HomeHeader user={user} />
      </SafeAreaView>
      {/* WHITE CONTENT CONTAINER */}
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,

          marginTop: 10,
        }}
      >
        {/* BANNER */}
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

        {/* COUPON SECTION */}
        <View style={{ marginTop: 12 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
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

        {/* RECOMMENDED SHOPS */}
        <View style={{ marginTop: 12 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              ร้านค้าแนะนำใกล้คุณ
            </Text>
          </View>

          <FlatList
            data={recommendedShops}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 12,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  marginRight: 16,
                  width: 220,
                  elevation: 3,
                }}
                onPress={() => handleShopRouter(item.id)}
              >
                <View
                  style={{
                    height: 130,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>

                <View style={{ padding: 12 }}>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: "#6b7280", marginTop: 4 }}>
                    {item.category}
                  </Text>
                  <Text style={{ color: "#f59e0b", marginTop: 6 }}>
                    ⭐ {item.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* MENU SECTION */}
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

        {/* PROMOTION SECTION */}
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
              <Text style={{ marginTop: 6, color: "#78350f" }}>
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
