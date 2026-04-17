import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Hero Section */}
        <View className="mb-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8">
          <Text className="text-3xl font-bold text-white mb-4">
            ระบบสำหรับร้านค้า
          </Text>

          <Text className="text-base text-blue-100 leading-6">
            เครื่องมือจัดการร้านค้าแบบครบวงจร รับเงิน จัดการคำสั่งซื้อ
            และตรวจสอบรายได้ ได้อย่างมืออาชีพในระบบเดียว
          </Text>

          <Pressable
            onPress={() => router.replace("/register")}
            className="mt-8 bg-white rounded-xl py-4 items-center active:bg-gray-100"
          >
            <Text className="text-blue-600 font-semibold text-base">
              เริ่มต้นใช้งานฟรี
            </Text>
          </Pressable>
        </View>

        {/* Feature Cards */}
        <View className=" gap-4">
          <FeatureCard
            title="ค่าบริการโปร่งใส"
            desc="ไม่มีค่าใช้จ่ายแอบแฝง ตรวจสอบรายละเอียดค่าธรรมเนียมได้ชัดเจนก่อนเริ่มใช้งาน"
            color="border-blue-200 bg-blue-50"
          />

          <FeatureCard
            title="รับเงินโดยตรง"
            desc="เงินโอนเข้าบัญชีของคุณโดยตรง ไม่ผ่านระบบกลาง ตรวจสอบสถานะการชำระเงินได้ทันที"
            color="border-emerald-200 bg-emerald-50"
          />

          <FeatureCard
            title="สมัครง่าย"
            desc="กรอกข้อมูลเพียงไม่กี่ขั้นตอน เริ่มต้นใช้งานระบบได้ทันที"
            color="border-indigo-200 bg-indigo-50"
          />

          <FeatureCard
            title="แดชบอร์ดสรุปยอด"
            desc="ดูภาพรวมยอดขาย รายรับ และสถิติสำคัญในหน้าเดียว ช่วยให้ตัดสินใจได้แม่นยำขึ้น"
            color="border-purple-200 bg-purple-50"
          />

          <FeatureCard
            title="ระบบลูกจ้างและนายจ้าง"
            desc="บริหารจัดการสิทธิ์การเข้าถึง แยกบทบาทการทำงานอย่างชัดเจน"
            color="border-amber-200 bg-amber-50"
          />

          <FeatureCard
            title="ระบบเฉพาะตามความต้องการ"
            desc="ต้องการฟีเจอร์เฉพาะสำหรับธุรกิจของคุณ สามารถติดต่อทีมงานเพื่อพัฒนาเพิ่มเติมได้"
            color="border-rose-200 bg-rose-50"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({
  title,
  desc,
  color,
}: {
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <View className={`rounded-2xl p-6 border ${color} shadow-sm`}>
      <Text className="text-lg font-semibold text-gray-900 mb-2">{title}</Text>
      <Text className="text-gray-600 text-sm leading-5">{desc}</Text>
    </View>
  );
}
