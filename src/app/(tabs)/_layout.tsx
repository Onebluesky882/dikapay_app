import { useCartStore } from "@/src/store/Cart/store-order";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS } from "react-native";
export default function _layout() {
  const cart = useCartStore((state) => state.cart);
  const openBadge = cart.length.toString();
  return (
    <NativeTabs
      backgroundColor="blue"
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: "white",
          light: "green",
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: "white",
        light: "green",
      })}
    >
      <NativeTabs.Trigger name="(home)" disableScrollToTop>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          renderingMode="template"
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="shop">
        <NativeTabs.Trigger.Label>Shop</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bag.fill" md="shopping_bag" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
        {/*  my cart */}

        {openBadge !== "0" && (
          <NativeTabs.Trigger.Badge>{openBadge}</NativeTabs.Trigger.Badge>
        )}

        <NativeTabs.Trigger.Icon sf="receipt.fill" md="receipt" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(message)">
        <NativeTabs.Trigger.Label>Message</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon sf="message.fill" md="chat" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(dashboard)">
        <NativeTabs.Trigger.Label>Me</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.grid.2x2.fill" md="h_mobiledata" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
