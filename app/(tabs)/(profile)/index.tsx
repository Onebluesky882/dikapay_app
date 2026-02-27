import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../src/store/auth-store";

export default function user() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  if (!user) return <ActivityIndicator />;
  return (
    <SafeAreaView>
      <View className="px-2">
        <Text>welcome {user.name}</Text>
        <Pressable onPress={() => router.replace("/(shop)")}>
          <Text>สมัคร้านค้า</Text>
        </Pressable>
        <Button title="logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
