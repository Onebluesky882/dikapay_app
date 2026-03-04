import { useCartStore } from "@/src/store/Order/store-order";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  const cart = useCartStore((state) => state.cart);
  const myCart = cart.reduce((total, item) => total + item.quantity, 0);
  const openBadge = myCart.toString();

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
      <Tabs.Screen name="(ranking)" />
    </NativeTabs>
  );
}
