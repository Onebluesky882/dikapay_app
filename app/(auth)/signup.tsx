import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white px-6 pt-5 "
    >
      {/* Logo / Title */}
      <View className="items-center mb-12">
        <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
        <Text className="text-gray-500 mt-2 text-center">
          สมัครใช้งาน dikapay ฟรี ไม่มีค่าธรรมเนียม
        </Text>
      </View>

      {/* Form */}
      <View className="gap-y-5">
        {/* Name */}
        <View>
          <Text className="text-gray-600 mb-2 font-medium">Full Name</Text>
          <TextInput
            placeholder="Your name"
            className="h-14 px-4 rounded-xl border border-gray-200 bg-gray-50"
          />
        </View>

        {/* Email */}
        <View>
          <Text className="text-gray-600 mb-2 font-medium">Email</Text>
          <TextInput
            placeholder="name@email.com"
            keyboardType="email-address"
            className="h-14 px-4 rounded-xl border border-gray-200 bg-gray-50"
          />
        </View>

        {/* Password */}
        <View>
          <Text className="text-gray-600 mb-2 font-medium">Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="h-14 px-4 rounded-xl border border-gray-200 bg-gray-50"
          />
        </View>

        {/* Confirm */}
        <View>
          <Text className="text-gray-600 mb-2 font-medium">
            Confirm Password
          </Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="h-14 px-4 rounded-xl border border-gray-200 bg-gray-50"
          />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity className="bg-indigo-600 h-14 rounded-xl items-center justify-center mt-8 shadow-lg">
        <Text className="text-white font-bold text-base">Create Account</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-3 text-gray-400 text-xs">OR</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social */}
      <TouchableOpacity className="h-14 rounded-xl border border-gray-200 items-center justify-center">
        <Text className="font-semibold text-gray-700">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="flex-row justify-center mt-10">
        <Text className="text-gray-500">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text className="text-indigo-600 font-bold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
