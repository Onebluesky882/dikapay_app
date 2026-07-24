import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#00B14F";

export default function ScanTable() {
  const [permission, requestPermission] = useCameraPermissions();
  // Guards against onBarcodeScanned firing repeatedly for the same frame before we navigate away.
  const scannedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleScan = ({ data }: { data: string }) => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setErrorMessage(null);
    router.replace(`/(tabs)/shop/table/${encodeURIComponent(data)}`);
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="camera-outline" size={48} color="#9CA3AF" />
          <Text className="text-lg font-bold text-gray-900 mt-4 text-center">
            ต้องใช้กล้องเพื่อสแกน QR โต๊ะ
          </Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            อนุญาตให้ Dikapay เข้าถึงกล้อง เพื่อสแกน QR ที่โต๊ะแล้วดูเมนูร้านได้ทันที
          </Text>
          <Pressable
            onPress={requestPermission}
            className="mt-6 bg-[#00B14F] rounded-xl px-6 py-3 min-h-[44px] justify-center"
          >
            <Text className="text-white font-bold text-base">อนุญาตกล้อง</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

      <SafeAreaView className="absolute top-0 left-0 right-0" edges={["top"]}>
        <View className="flex-row items-center px-4 pt-2">
          <Pressable
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full bg-black/40 items-center justify-center"
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
        <Animated.View
          entering={FadeIn.duration(250)}
          className="w-64 h-64 rounded-3xl border-2 border-white/80"
        />
        <Text className="text-white text-sm font-medium mt-6 bg-black/40 px-4 py-2 rounded-full">
          วาง QR โต๊ะให้อยู่ในกรอบ
        </Text>
        {errorMessage && (
          <Text className="text-white text-sm font-bold mt-3 bg-red-500/90 px-4 py-2 rounded-full">
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
}
