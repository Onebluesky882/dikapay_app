import React from "react";
import {
  Pressable,
  ScrollView as RNScrollView,
  Text as RNText,
  View as RNView,
} from "react-native";

export const View = ({ children, className = "", ...props }: any) => (
  <RNView className={className} {...props}>
    {children}
  </RNView>
);

export const Text = ({ children, className = "", ...props }: any) => (
  <RNText className={className} {...props}>
    {children}
  </RNText>
);

export const TouchableOpacity = ({
  children,
  className = "",
  disabled,
  ...props
}: any) => (
  <Pressable disabled={disabled} className={className} {...props}>
    {children}
  </Pressable>
);

export const ScrollView = ({ children, className = "", ...props }: any) => (
  <RNScrollView className={className} {...props}>
    {children}
  </RNScrollView>
);

export const SafeAreaView = ({ children, className = "", ...props }: any) => (
  <SafeAreaView className={className} {...props}>
    {children}
  </SafeAreaView>
);
