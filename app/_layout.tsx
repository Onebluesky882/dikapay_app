import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/src/store/auth-store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const user = useAuthStore((s) => s.user);
  const loadSession = useAuthStore((s) => s.loadSession);

  const [appReady, setAppReady] = useState(false);

  useFonts({
    SarabunRegular: require("../assets/fonts/sarabun/Sarabun-Regular.ttf"),
    SarabunMedium: require("../assets/fonts/sarabun/Sarabun-Medium.ttf"),
    SarabunSemiBold: require("../assets/fonts/sarabun/Sarabun-SemiBold.ttf"),
    SarabunBold: require("../assets/fonts/sarabun/Sarabun-Bold.ttf"),

    SFProRegular: require("../assets/fonts/sfpro/SF-Pro-Text-Regular.otf"),
    SFProMedium: require("../assets/fonts/sfpro/SF-Pro-Text-Medium.otf"),
    SFProSemiBold: require("../assets/fonts/sfpro/SF-Pro-Text-Semibold.otf"),
    SFProBold: require("../assets/fonts/sfpro/SF-Pro-Text-Bold.otf"),
    SFProBlack: require("../assets/fonts/sfpro/SF-Pro-Text-Black.otf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await loadSession();
      setAppReady(true);
    };

    prepare();
  }, []);

  // รอทั้ง font + session
  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!user}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(shop)" />
            </Stack.Protected>

            <Stack.Protected guard={!user}>
              <Stack.Screen name="index" />
              <Stack.Screen name="sign-in" options={{ animation: "none" }} />
            </Stack.Protected>
          </Stack>
          <StatusBar style="auto" />
        </KeyboardProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
