import { View, Text, Button } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "profile",
        headerRight: () => <Button title="Edit" />,
      }}
    />
  );
}
