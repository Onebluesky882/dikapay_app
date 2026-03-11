import { uploadImage } from "@/src/api/attach-image/presigned-url";
import Banner from "@/src/components/homepage/Bannner";
import { CouponCard } from "@/src/components/homepage/CouponCard";
import HomeHeader from "@/src/components/homepage/HomeHeader";
import MenuIcon from "@/src/components/homepage/MenuIcon";
import { MenuSuggestion } from "@/src/components/homepage/MenuSuggestion";
import Promotion from "@/src/components/homepage/Promotion";
import { RecommendedCard } from "@/src/components/homepage/RecommendCard";
import { UploadImage } from "@/src/components/upload-image";
import { usePickImage } from "@/src/hooks/usePickImage/usePickImage";
import { useAuthStore } from "@/src/store/auth-store";
import { PresignedUrlDto } from "@/src/types/upload-image.type";
import { getMimeType } from "@/src/utils/getMimeImageType";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const { image, loading, pickImage, clearImage } = usePickImage();
  const userId = String(user?.id);

  const handleSubmitPresigned = async () => {
    if (!image) return;

    const body: PresignedUrlDto = {
      imageType: "slip",
      userId,
      mimeType: getMimeType(image),
    };

    const res = await uploadImage.presignedUrl(body);

    const file = await fetch(image);
    const blob = await file.blob();

    const data = await uploadImage.clientUpload({
      presignedUrl: res.data.path,
      blob,
      mimeType: body.mimeType,
      userId,
    });

    if (data) {
      clearImage();
    }
  };

  const handleCloseImage = () => {
    clearImage();
  };

  const handleShopRouter = (id: string) => {
    router.push(`/shop/${id}`);
  };

  if (!user) return null;

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
        <View>
          <UploadImage
            handleCloseImage={handleCloseImage}
            handleSubmitPresigned={handleSubmitPresigned}
            image={image}
            loading={loading}
            pickImage={pickImage}
          />
        </View>
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
