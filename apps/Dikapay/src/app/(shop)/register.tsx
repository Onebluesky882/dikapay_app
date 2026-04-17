import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [form, setForm] = useState({
    shopName: "",
    category: "",
    ownerName: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Header Card */}
        <View className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-tl-3xl rounded-tr-3xl p-6">
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Dikaapp Super App
          </Text>
          <Text className="text-blue-100 text-center text-sm">
            ฟรี ไม่มีค่าธรรมเนียม รับเงินจากลูกค้าโดยตรง
          </Text>
          <Text className="text-blue-100 text-center text-sm mt-1">
            ตรวจสอบยอดโอนแบบเรียลไทม์ มั่นใจได้รับเงินตรง
          </Text>
        </View>

        {/* Form Card */}
        <View className="bg-white p-6 shadow-sm border border-gray-200 rounded-b-3xl">
          <Text className="text-xl font-semibold text-gray-900 mb-6">
            ข้อมูลร้านค้า
          </Text>

          <Input
            label="ชื่อร้าน"
            placeholder="เช่น ร้านกาแฟบ้านสวน"
            value={form.shopName}
            onChangeText={(v) => handleChange("shopName", v)}
          />

          <Input
            label="ประเภทร้าน"
            placeholder="เช่น อาหาร, เสื้อผ้า, บริการ"
            value={form.category}
            onChangeText={(v) => handleChange("category", v)}
          />

          <Input
            label="ชื่อเจ้าของร้าน"
            placeholder="ชื่อ - นามสกุล"
            value={form.ownerName}
            onChangeText={(v) => handleChange("ownerName", v)}
          />

          <Input
            label="เบอร์โทรศัพท์"
            placeholder="08xxxxxxxx"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => handleChange("phone", v)}
          />

          <Input
            label="ที่อยู่ร้านค้า"
            placeholder="ที่อยู่โดยละเอียด"
            value={form.address}
            onChangeText={(v) => handleChange("address", v)}
          />

          {/* Description */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              คำอธิบายร้าน
            </Text>
            <TextInput
              placeholder="อธิบายสั้น ๆ เกี่ยวกับร้านของคุณ"
              multiline
              numberOfLines={4}
              value={form.description}
              onChangeText={(v) => handleChange("description", v)}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800"
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={() => router.replace("/verification")}
            className="bg-blue-600 py-4 rounded-2xl items-center active:bg-blue-700 shadow-sm"
          >
            <Text className="text-white font-semibold text-base">
              หน้าถัดไป
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({
  label,
  ...props
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (v: string) => void;
  keyboardType?: any;
}) {
  return (
    <View className="mb-5">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        {...props}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800"
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}
