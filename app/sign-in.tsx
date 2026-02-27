import { otpEmailApi } from "@/src/api/otp-email/otp-email";
import { useAuthStore } from "@/src/store/auth-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const loginWithOtp = useAuthStore((state) => state.loginWithOtp);
  const authLoading = useAuthStore((state) => state.loading);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const sendOtp = async () => {
    if (!email) return Alert.alert("Please enter email");

    try {
      setSendingOtp(true);

      await otpEmailApi.sendOtp(email);

      setOtpSent(true);
      setCountdown(60); // เริ่มนับถอยหลัง 60 วิ
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Please enter OTP");

    try {
      await loginWithOtp(email, otp);
      // ไม่ต้อง navigate เอง
      // guard จะ redirect ให้
    } catch (error) {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-3xl font-bold text-center mb-8">Login</Text>

      {/* Email Input */}
      <View
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 12,
          justifyContent: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
          backgroundColor: "white",
        }}
      >
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          editable={!otpSent}
          underlineColorAndroid="transparent"
          className="text-gray-500"
          style={{
            fontSize: 18,
            padding: 0, // 🔥 สำคัญมาก
            margin: 0, // 🔥 กัน layout shift
          }}
        />
      </View>

      {otpSent && (
        <Text className="text-blue-500 text-sm mb-4">
          OTP sent to your email
        </Text>
      )}

      {!otpSent ? (
        // SEND OTP BUTTON
        <TouchableOpacity
          disabled={sendingOtp}
          onPress={sendOtp}
          className="bg-blue-600 p-4 rounded-xl items-center"
        >
          {sendingOtp ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-lg">Send OTP</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          {/* OTP Input */}
          <TextInput
            placeholder="Enter OTP"
            className="bg-white p-4 rounded-xl mb-4 border border-gray-200 text-lg"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            disabled={authLoading}
            onPress={verifyOtp}
            className="bg-green-600 p-4 rounded-xl items-center"
          >
            {authLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Verify OTP
              </Text>
            )}
          </TouchableOpacity>

          {/* RESEND BUTTON */}
          <View className="mt-4 items-center">
            {countdown > 0 ? (
              <Text className="text-gray-500">Resend OTP in {countdown}s</Text>
            ) : (
              <Button
                title="Resend OTP"
                onPress={sendOtp}
                disabled={sendingOtp}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}
