import Banner from "@/components/homepage/Bannner";
import { CouponCard } from "@/components/homepage/CouponCard";
import HomeHeader from "@/components/homepage/HomeHeader";
import MenuIcon from "@/components/homepage/MenuIcon";
import { MenuSuggestion } from "@/components/homepage/MenuSuggestion";
import Promotion from "@/components/homepage/Promotion";
import { RecommendedCard } from "@/components/homepage/RecommendCard";
import { UploadImage } from "@/components/upload-image";
import { usePickImage } from "@/hooks/usePickImage";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useAuthStore } from "@/store/auth-store";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const { image, pickImage, clearImage } = usePickImage();
  const userId = String(user?.id);

  const { upload, loading } = useUploadImage();

  const handleSubmitPresigned = async () => {
    if (!image || !user?.id) return;

    try {
      await upload(image, userId);
      clearImage();
    } catch (error) {
      console.error(error);
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
