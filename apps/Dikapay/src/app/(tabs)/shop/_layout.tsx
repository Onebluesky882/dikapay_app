import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false, presentation: "fullScreenModal" }} />
      <Stack.Screen name="table/[qrToken]" options={{ headerShown: false }} />
    </Stack>
  );
}
