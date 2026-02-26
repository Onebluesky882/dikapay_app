import { useAuthStore } from "@/src/store/auth-store";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogOut = async () => {
    await logout();
    router.replace("/sign-in");
  };

  console.log("user :", user);

  return (
    <SafeAreaView>
      <View>
        <Text> welcome {user?.email}</Text>
        <Button title="logout" onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
}
