import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function orders() {
  const handleRouter = () => {
    router.push({
      pathname: "/(app)/(shop)/[id]",
      params: { id: "1" },
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="shop" onPress={handleRouter} />
        <Text>order</Text>
      </View>
    </SafeAreaView>
  );
}
