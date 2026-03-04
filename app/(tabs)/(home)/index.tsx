import Banner from "@/components/homepage/Bannner";
import { CouponCard } from "@/components/homepage/CouponCard";
import HomeHeader from "@/components/homepage/HomeHeader";
import MenuIcon from "@/components/homepage/MenuIcon";
import { MenuSuggestion } from "@/components/homepage/MenuSuggestion";
import Promotion from "@/components/homepage/Promotion";
import { RecommendedCard } from "@/components/homepage/RecommendCard";
import { useAuthStore } from "@/src/store/auth-store";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
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
        <Banner />

        {/* menu icon */}
        <MenuIcon />
        {/* COUPON SECTION */}
        <CouponCard />

        {/* RECOMMENDED SHOPS */}
        <RecommendedCard handleShopRouter={handleShopRouter} />

        {/* MENU SECTION */}
        <MenuSuggestion />

        {/* PROMOTION SECTION */}
        <Promotion />
      </View>
    </ScrollView>
  );
}
