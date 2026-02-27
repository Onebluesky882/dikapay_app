import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/src/store/auth-store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const user = useAuthStore((s) => s.user);
  const loadSession = useAuthStore((s) => s.loadSession);
  const [loading, setLoading] = useState(true);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return; // 👈 กันยิงซ้ำ

    hasInitialized.current = true;

    const init = async () => {
      await loadSession();
      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* เข้า tabs เมื่อ login แล้ว */}
            <Stack.Protected guard={!!user}>
              <Stack.Screen name="(tabs)" />
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
