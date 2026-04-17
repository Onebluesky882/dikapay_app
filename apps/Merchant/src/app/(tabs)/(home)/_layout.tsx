import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, usePathname, useRouter } from "expo-router";

export default function Layout() {
 
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerRight: () => (
            <Button
              title="Generate"
              onPress={() => router.push("/generation")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="generation"
        options={{
          title: "Generation",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
