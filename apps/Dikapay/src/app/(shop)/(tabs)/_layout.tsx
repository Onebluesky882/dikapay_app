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
      <NativeTabs.Trigger name="index" disableScrollToTop>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          renderingMode="template"
          md="home"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
