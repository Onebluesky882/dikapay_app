import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Verification() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            ยืนยันข้อมูลรับเงิน
          </Text>
          <Text className="text-indigo-100 text-sm leading-5">
            กรุณาอัปโหลดเอกสารและรูปภาพเพื่อยืนยันตัวตนก่อนเปิดใช้งานระบบรับเงิน
          </Text>
        </View>

        {/* Warning Notice */}
        <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <Text className="text-amber-700 text-sm leading-5">
            ชื่อผู้รับเงินจะต้องตรงกับชื่อที่ใช้สมัครเท่านั้น หากข้อมูลไม่ตรงกัน
            ระบบจะไม่สามารถอนุมัติได้
          </Text>
        </View>

        {/* Upload Sections */}
        <View className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <UploadItem title="รูปเอกสารยืนยันตัวตน" />
          <UploadItem title="รูปบัญชีธนาคาร / พร้อมเพย์" />
          <UploadItem title="รูปคิวอาร์โค้ดรับเงิน" />

          {/* Submit */}
          <Pressable className="mt-6 bg-blue-600 py-4 rounded-2xl items-center active:bg-blue-700">
            <Text className="text-white font-semibold">
              ส่งข้อมูลเพื่อยืนยัน
            </Text>
          </Pressable>
        </View>

        {/* Footer Note */}
        <View className="mt-6">
          <Text className="text-center text-gray-600 text-sm">
            ทีมงานจะตรวจสอบและอนุมัติภายใน 1 วันทำการ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function UploadItem({ title }: { title: string }) {
  return (
    <View className="mb-5">
      <Text className="text-sm font-medium text-gray-700 mb-2">{title}</Text>
      <Pressable className="border-2 border-dashed border-gray-300 rounded-2xl py-8 items-center active:bg-gray-50">
        <Text className="text-gray-500 text-sm">แตะเพื่ออัปโหลดไฟล์</Text>
      </Pressable>
    </View>
  );
}
