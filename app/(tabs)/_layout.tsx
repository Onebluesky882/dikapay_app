import {
  Badge,
  Icon,
  Label,
  NativeTabs,
} from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  return (
    <NativeTabs iconColor={"gray"}>
      <NativeTabs.Trigger name="index" disableScrollToTop>
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="ic_menu_view" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="orders">
        <Label>Orders</Label>
        <Icon sf="cart.fill" drawable="ic_menu_agenda" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="inbox">
        <Badge>9</Badge>
        <Label>Inbox</Label>
        <Icon sf="tray.fill" drawable="ic_dialog_email" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf="person.crop.circle.fill" drawable="ic_menu_myplaces" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
