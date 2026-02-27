import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  return (
    <NativeTabs
      labelStyle={{
        default: { color: "blue" },
        selected: { color: "red" },
      }}
      iconColor={{
        default: "blue",
        selected: "red",
      }}
    >
      <NativeTabs.Trigger name="(home)" disableScrollToTop>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          renderingMode="template"
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>orders</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="inbox">
        <NativeTabs.Trigger.Label>inbox</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Badge>9</NativeTabs.Trigger.Badge>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(profile)">
        <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
