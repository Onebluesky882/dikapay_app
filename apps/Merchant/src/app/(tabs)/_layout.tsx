import { View, Text, Platform } from "react-native";
import React from "react";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { usePathname } from "expo-router";

export default function Layout() {
  const path = usePathname();
  return (
    <NativeTabs
      hidden={path === "/generation"}
      tintColor={Platform.select({
        ios: "#E06C75",
      })}
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" drawable="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(profile)">
        <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape.2.fill" drawable="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
