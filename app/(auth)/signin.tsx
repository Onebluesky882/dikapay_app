import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = () => {
    setIsLoading(true);

    setTimeout(() => {
      Alert.alert("Login", `Signing in with ${email}`);
      setIsLoading(false);
    }, 1200);
  };

  const handleLineLogin = () => {
    Alert.alert("LINE Login");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white p-8"
      keyboardShouldPersistTaps="handled"
    >
      {/* ---------------- Header ---------------- */}
      <View className="items-center mb-10">
        <View className="items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-6">
          <Svg width={32} height={32} viewBox="0 0 24 24">
            <Path
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.378 0 2.683.278 3.873.78"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <Text className="text-2xl font-bold text-slate-900">Welcome back!</Text>

        <Text className="text-slate-500 mt-2">
          Please enter your details to continue
        </Text>
      </View>

      {/* ---------------- Social ---------------- */}
      <View className="gap-3 mb-8">
        <TouchableOpacity
          onPress={handleLineLogin}
          className="h-12 rounded-xl bg-green-500 items-center justify-center"
        >
          <Text className="text-white font-semibold">Sign in with LINE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Google Login")}
          className="h-12 rounded-xl bg-red-500 items-center justify-center"
        >
          <Text className="text-white font-semibold">Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      {/* ---------------- Divider ---------------- */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-3 text-gray-400 text-xs">OR EMAIL LOGIN</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* ---------------- Email ---------------- */}
      <View className="gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="name@company.com"
            autoCapitalize="none"
            keyboardType="email-address"
            className="border border-gray-300 rounded-xl px-4 h-12"
          />
        </View>

        {/* ---------------- Password ---------------- */}
        <View>
          <Text className="mb-2 text-sm font-medium">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            className="border border-gray-300 rounded-xl px-4 h-12"
          />

          <TouchableOpacity className="items-end mt-2">
            <Text className="text-indigo-600 text-sm font-semibold">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------------- Sign In Button ---------------- */}
        <TouchableOpacity
          onPress={handleEmailSignIn}
          disabled={isLoading}
          className="bg-indigo-600 h-12 rounded-xl items-center justify-center"
        >
          {isLoading ? (
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth={4}
                opacity={0.25}
              />
              <Path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="white"
                opacity={0.75}
              />
            </Svg>
          ) : (
            <Text className="text-white font-bold">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ---------------- Footer ---------------- */}
      <View className="mt-10 items-center flex">
        <Text className="text-gray-500">
          <Text>Don't have an account?</Text>
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-indigo-600 font-bold">Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
