import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      {/* ================= HERO ================= */}
      <View className="items-center mb-14">
        <Text className="text-3xl font-bold text-slate-900 text-center">
          DikaPay
        </Text>

        <Text className="text-slate-500 text-center mt-3 leading-6">
          รับเงิน • ตรวจสลิป • POS • เมนูออนไลน์ {"\n"}
          ครบจบในแอพเดียว ฟรีค่าธรรมเนียม
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/SignIn")}
          className="bg-indigo-600 px-8 py-4 rounded-2xl mt-8 shadow-lg shadow-indigo-300"
        >
          <Text className="text-white font-semibold text-base">
            เริ่มใช้งานฟรี
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= FEATURES ================= */}
      <Text className="text-xl font-bold text-slate-900 mb-6">ฟีเจอร์เด่น</Text>

      <View className="gap-4 mb-14">
        <Feature
          icon="qr"
          title="ตรวจสลิปอัตโนมัติ"
          desc="ลูกค้าโอน → ระบบเช็คให้ทันที ไม่ต้องอัปโหลดสลิป"
        />

        <Feature
          icon="money"
          title="ฟรีค่าธรรมเนียม"
          desc="ไม่มีค่ารายเดือน ไม่มี % หัก"
        />

        <Feature
          icon="pos"
          title="POS & เมนูออนไลน์"
          desc="สั่งอาหาร จัดการออเดอร์ บันทึกอัตโนมัติ"
        />

        <Feature
          icon="track"
          title="ติดตามสถานะเรียลไทม์"
          desc="เช็คการชำระเงินและออเดอร์ได้ทันที"
        />
      </View>

      {/* ================= HOW IT WORKS ================= */}
      <Text className="text-xl font-bold text-slate-900 mb-6">
        ใช้งานง่าย 3 ขั้นตอน
      </Text>

      <Step number="1" text="สร้างร้านค้า" />
      <Step number="2" text="รับเงินผ่าน QR หรือออนไลน์" />
      <Step number="3" text="ระบบบันทึกบัญชีให้อัตโนมัติ" />

      {/* ================= CTA ================= */}
      <View className="mt-16 mb-20 bg-indigo-50 rounded-3xl p-8 items-center">
        <Text className="text-xl font-bold text-indigo-700 text-center">
          เริ่มต้นใช้ฟรีวันนี้
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/SignIn")}
          className="bg-indigo-600 px-10 py-4 rounded-2xl mt-6"
        >
          <Text className="text-white font-semibold">สมัครใช้งาน</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================================================= */
/* ================= COMPONENTS ==================== */
/* ================================================= */

function Feature({ icon, title, desc }: any) {
  return (
    <View className="flex-row items-center bg-slate-50 p-5 rounded-2xl">
      <Icon name={icon} />

      <View className="ml-4 flex-1">
        <Text className="font-semibold text-slate-900">{title}</Text>
        <Text className="text-slate-500 text-sm mt-1">{desc}</Text>
      </View>
    </View>
  );
}

function Step({ number, text }: any) {
  return (
    <View className="flex-row items-center mb-4">
      <View className="bg-indigo-600 w-8 h-8 rounded-full items-center justify-center mr-4">
        <Text className="text-white text-xs font-bold">{number}</Text>
      </View>

      <Text className="text-slate-700">{text}</Text>
    </View>
  );
}

/* ================= ICONS ================= */

function Icon({ name }: any) {
  const size = 26;

  switch (name) {
    case "qr":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </Svg>
      );

    case "money":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 2v20m5-15H9a3 3 0 000 6h6a3 3 0 010 6H7"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    case "pos":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M3 5h18v14H3zM7 9h10M7 13h6"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </Svg>
      );

    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 8v4l3 3M21 12a9 9 0 11-9-9"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </Svg>
      );
  }
}
