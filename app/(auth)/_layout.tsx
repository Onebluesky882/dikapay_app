import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal", // 👈 สำคัญ
        animation: "slide_from_bottom", // 👈 เพิ่มอันนี้
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
