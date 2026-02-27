import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Shop() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>shop :{id}</Text>
    </View>
  );
}
