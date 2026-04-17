import "../../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { Stack } from "expo-router";

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff", // screen bg
    card: "#FF6B6B", // 🔥 toolbar/header bg
    text: "#000000",
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#1A1A2E", // 🔥 toolbar/header bg (dark)
    text: "#ffffff",
  },
};
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
    >
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Protected guard={true}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={false}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
