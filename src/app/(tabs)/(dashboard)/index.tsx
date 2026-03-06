import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../store/auth-store";

export default function User() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const { width } = useWindowDimensions();

  const [nickname, setNickname] = useState("");
  const [editing, setEditing] = useState(false);

  if (!user)
    return (
      <View className="flex-1 items-center justify-center bg-amber-50">
        <ActivityIndicator />
      </View>
    );

  const spendingData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [120, 250, 90, 300, 180, 220, 150],
      },
    ],
  };

  const handleSave = () => {
    if (!nickname.trim()) return;
    setEditing(false);
    // TODO: save to API or zustand store
  };

  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-4 py-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-semibold text-amber-900">
              บัญชีสมาชิก
            </Text>
            <Text className="text-amber-700 mt-1">email : {user.name}</Text>
          </View>

          {/* Nickname Section */}
          <View className="bg-orange-50 rounded-2xl p-5 border border-orange-100 mb-6">
            <Text className="text-amber-900 font-semibold mb-3">ชื่อเล่น</Text>

            {!nickname && !editing && (
              <Pressable
                onPress={() => setEditing(true)}
                className="bg-orange-200 rounded-xl py-3 items-center"
              >
                <Text className="text-amber-900 font-medium">
                  + เพิ่มชื่อเล่น
                </Text>
              </Pressable>
            )}

            {nickname && !editing && (
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-semibold text-amber-900">
                  {nickname}
                </Text>
                <Pressable onPress={() => setEditing(true)}>
                  <Text className="text-orange-600 font-medium">แก้ไข</Text>
                </Pressable>
              </View>
            )}

            {editing && (
              <>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="เช่น มิน, ต้น, ฟ้า"
                  className="bg-white rounded-xl px-4 py-3 border border-orange-200 text-amber-900"
                  placeholderTextColor="#c2410c"
                  maxLength={12}
                />

                <View className="flex-row gap-3 mt-3">
                  <Pressable
                    onPress={handleSave}
                    className="flex-1 bg-orange-300 rounded-xl py-3 items-center"
                  >
                    <Text className="text-amber-900 font-medium">บันทึก</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setEditing(false)}
                    className="flex-1 bg-white border border-orange-200 rounded-xl py-3 items-center"
                  >
                    <Text className="text-orange-600 font-medium">ยกเลิก</Text>
                  </Pressable>
                </View>
              </>
            )}

            <Text className="text-xs text-orange-600 mt-3">
              ชื่อนี้จะแสดงตอนสั่งอาหารหน้าร้าน
            </Text>
          </View>
          <CardReword />

          {/* Balance Card */}
          <View className="bg-white rounded-2xl p-5 border border-orange-100 mb-6">
            <Text className="text-orange-700 text-sm">ยอดเงินคงเหลือ</Text>

            <Text className="text-3xl font-bold text-amber-900 mt-2">
              ฿ 1,250.00
            </Text>

            <Pressable className="mt-4 bg-orange-200 rounded-xl py-3 items-center">
              <Text className="text-amber-900 font-medium">เติมเงิน</Text>
            </Pressable>
          </View>

          {/* Spending Chart */}
          <View className="bg-white rounded-2xl p-4 border border-orange-100 mb-6 overflow-hidden">
            <Text className="text-amber-900 font-semibold mb-3">
              รายจ่าย 7 วันล่าสุด
            </Text>

            <LineChart
              data={spendingData}
              width={width - 32}
              height={220}
              yAxisSuffix="฿"
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(180, 83, 9, ${opacity})`,
                labelColor: () => "#92400e",
                propsForDots: {
                  r: "3",
                  strokeWidth: "2",
                  stroke: "#b45309",
                },
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>

          {/* Menu */}
          <View className="bg-white rounded-2xl border border-orange-100">
            <Pressable
              onPress={() => router.push("/orders")}
              className="px-5 py-4 border-b border-orange-100"
            >
              <Text className="text-amber-900">ประวัติการซื้ออาหาร</Text>
            </Pressable>

            <Pressable className="px-5 py-4">
              <Text className="text-amber-900">สถานะสมาชิก</Text>
            </Pressable>
          </View>

          {/* Logout */}
          <Pressable
            onPress={logout}
            className="mt-8 bg-orange-100 rounded-xl py-3 items-center"
          >
            <Text className="text-orange-700 font-medium">ออกจากระบบ</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function CardReword() {
  return (
    <View
      className=" mt-4 shadow-md border border-gray-100 bg-white p-8"
      style={{
        padding: 16,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Icon + Text */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFE8B6",
            padding: 10,
            borderRadius: 50,
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name="teddy-bear" size={24} color="#F59E0B" />
        </View>

        <View>
          <Text style={{ fontSize: 12, color: "#6B7280" }}>คะแนนสะสม</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            120 แต้ม
          </Text>
          <Text>
            {" "}
            ครบ 1000 แต้ม แลกรับส่วนลด{" "}
            <Text className="text-red-500">5 บาท</Text>{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
