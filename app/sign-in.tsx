import { otpEmailApi } from "@/src/api/otp-email/otp-email";
import { useAuthStore } from "@/src/store/auth-store";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function signIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loadSession } = useAuthStore();
  const sendOtp = async () => {
    if (!email) return Alert.alert("please enter email");
    try {
      setLoading(true);
      await otpEmailApi.sendOtp(email);

      setOtpSent(true);
      Alert.alert("OTP sent to your email");
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Please enter OTP");
    try {
      setLoading(true);
      const res = await otpEmailApi.verifyOtp({ email, otp });

      const token = res.data?.token;
      const user = res.data.user;

      await loadSession();

      router.replace("/(protected)");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-3xl font-bold text-center mb-8">Login</Text>

      <TextInput
        placeholder="Enter your email"
        className="bg-white p-4 rounded-xl mb-4 border border-gray-200 text-gray-500  text-xl"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />

      {!otpSent ? (
        <TouchableOpacity
          onPress={sendOtp}
          className="bg-blue-600 p-4 rounded-xl items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Send OTP</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            className="bg-white p-4 rounded-xl mb-4 border border-gray-200"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            onPress={verifyOtp}
            className="bg-green-600 p-4 rounded-xl items-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Verify OTP</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <Button title="Resend" onPress={sendOtp} />
    </View>
  );
}
