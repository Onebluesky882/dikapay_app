import { Text, Pressable, useColorScheme } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function Generation() {
  const [showTabBarView, setShowTabBarView] = useState(false);

  const { colors } = useTheme();

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button onPress={() => {}} icon={"book.closed.circle"} />
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.Button onPress={() => {}} icon={"square.and.arrow.up"} />
        <Stack.Toolbar.Button
          onPress={() => setShowTabBarView((prev) => !prev)}
          icon={"info"}
          hidden={showTabBarView}
        />
        <Stack.Toolbar.Spacer />

        <Stack.Toolbar.View hidden={!showTabBarView}>
          <Pressable
            onPress={() => setShowTabBarView((prev) => !prev)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 40,
            }}
          >
            <Text style={{ color: colors.text }}>show detail</Text>
          </Pressable>
        </Stack.Toolbar.View>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button onPress={() => {}} icon={"trash"} />
      </Stack.Toolbar>
    </>
  );
}
