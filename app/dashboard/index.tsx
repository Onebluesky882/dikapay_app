import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const mockTransactions = [
  { id: 1, name: "Coffee Shop", amount: 120, type: "in" },
  { id: 2, name: "Refund", amount: 50, type: "out" },
  { id: 3, name: "QR Payment", amount: 320, type: "in" },
  { id: 4, name: "Transfer Fee", amount: 10, type: "out" },
];

export default function HomePage() {
  return (
    <ScrollView className="flex-1 bg-slate-50 px-5 pt-14">
      {/* ================= HEADER ================= */}
      <View className="mb-8">
        <Text className="text-slate-400 text-sm">Welcome back</Text>
        <Text className="text-2xl font-bold text-slate-900">DikaPay</Text>
      </View>

      {/* ================= BALANCE CARD ================= */}
      <View className="bg-indigo-600 rounded-3xl p-6 shadow-xl shadow-indigo-300 mb-8">
        <Text className="text-indigo-200 text-sm">Available Balance</Text>
        <Text className="text-white text-3xl font-bold mt-2">฿ 12,580.00</Text>

        <TouchableOpacity
          onPress={() => router.push("/create-shop")}
          className="mt-4 bg-white/20 px-4 py-2 rounded-xl self-start"
        >
          <Text className="text-white font-semibold text-xs">
            + Create Shop
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= QUICK ACTIONS ================= */}
      <View className="flex-row justify-between mb-8">
        <ActionButton label="Receive" icon="receive" />
        <ActionButton label="Scan" icon="scan" />
        <ActionButton label="History" icon="history" />
        <ActionButton
          label="Shop"
          icon="shop"
          onPress={() => router.push("/create-shop")}
        />
      </View>

      {/* ================= TODAY SUMMARY ================= */}
      <Text className="text-lg font-bold text-slate-900 mb-4">Today</Text>

      <View className="flex-row gap-3 mb-8">
        <SummaryCard title="Income" value="+฿ 1,240" green />
        <SummaryCard title="Expense" value="-฿ 230" />
      </View>

      {/* ================= TRANSACTIONS ================= */}
      <Text className="text-lg font-bold text-slate-900 mb-4">
        Recent Activity
      </Text>

      <View className="bg-white rounded-2xl p-4 shadow-sm">
        {mockTransactions.map((item) => (
          <TransactionRow key={item.id} {...item} />
        ))}
      </View>
    </ScrollView>
  );
}

/* ===================================================== */
/* ================= COMPONENTS ======================== */
/* ===================================================== */

function ActionButton({ label, icon, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center bg-white w-20 h-20 rounded-2xl shadow-sm"
    >
      <Icon name={icon} />
      <Text className="text-xs mt-2 text-slate-700">{label}</Text>
    </TouchableOpacity>
  );
}

function SummaryCard({ title, value, green }: any) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
      <Text className="text-slate-400 text-sm">{title}</Text>
      <Text
        className={`text-lg font-bold mt-2 ${
          green ? "text-green-600" : "text-red-500"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

function TransactionRow({ name, amount, type }: any) {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-slate-100">
      <Text className="text-slate-800 font-medium">{name}</Text>
      <Text
        className={`font-semibold ${
          type === "in" ? "text-green-600" : "text-red-500"
        }`}
      >
        {type === "in" ? "+" : "-"}฿{amount}
      </Text>
    </View>
  );
}

/* ================= SIMPLE SVG ICONS ================= */

function Icon({ name }: any) {
  const size = 22;

  switch (name) {
    case "scan":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    case "receive":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 4v16m0 0l-5-5m5 5l5-5"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    case "history":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M3 12a9 9 0 109-9v3m0 0l3-3m-3 3l-3-3"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M4 4h16v16H4z"
            stroke="#6366f1"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );
  }
}
