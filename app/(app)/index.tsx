import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

export default function index() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* Tech SVG */}
      <LottieView
        source={require("../../assets/dottie/Delivery.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      <Text className="text-3xl font-semibold text-blue-900 mb-4">Dikapay</Text>

      <Text className="text-base text-gray-500 text-center mb-10">
        Secure. Simple. Reliable digital payments.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)")}
        className="bg-[#3f5be9] px-8 py-4 rounded-xl w-full"
        activeOpacity={0.85}
      >
        <Text className="text-white text-base font-medium text-center">
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
