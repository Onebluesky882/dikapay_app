import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  const orderStatus = "done"; // pending | cooking | done
  const cookingCount = 2;
  return (
    <NativeTabs
      backgroundColor="blue"
      labelStyle={{
        default: { color: "blue" },
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
      <NativeTabs.Trigger name="(ranking)">
        <NativeTabs.Trigger.Label>ranking</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon sf="star.fill" md="star" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Badge>
          {String(cookingCount)}
        </NativeTabs.Trigger.Badge>

        <NativeTabs.Trigger.Icon sf="receipt.fill" md="receipt" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(message)">
        <NativeTabs.Trigger.Label>Message</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Badge>9</NativeTabs.Trigger.Badge>

        <NativeTabs.Trigger.Icon sf="message.fill" md="chat" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(dashboard)">
        <NativeTabs.Trigger.Label>Me</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.grid.2x2.fill" md="h_mobiledata" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
