import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { authClient } from "@/src/lib/auth-client";
import { ActivityIndicator, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const s = await authClient.getSession();
        if (mounted) {
          setSession(s);
        }
      } catch (e) {
        console.log("SESSION ERROR:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {session ? (
              <Stack.Screen name="(protected)" />
            ) : (
              <Stack.Screen name="sign-in" />
            )}
          </Stack>
          <StatusBar style="auto" />
        </KeyboardProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
