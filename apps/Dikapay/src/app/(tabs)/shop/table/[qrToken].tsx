import { shopApi } from "@/api/shop/shop-api";
import { RealMenuItem, ScannedTable } from "@/types/table-scan.type";
import { formatBaht } from "@/utils/format-money";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#00B14F";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; table: ScannedTable; menu: RealMenuItem[] };

export default function ScannedTableScreen() {
  const { qrToken } = useLocalSearchParams<{ qrToken: string }>();
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const table = await shopApi.resolveTable(qrToken);
      const menu = await shopApi.getShopMenu(table.shopSlug);
      setState({ status: "ready", table, menu });
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "โต๊ะนี้ไม่ถูกต้องหรือหมดอายุ ลองสแกนใหม่อีกครั้ง",
      });
    }
  }, [qrToken]);

  useEffect(() => {
    // Fetching data on mount, not deriving state from props/refs — the
    // react-hooks/set-state-in-effect heuristic can't tell those apart.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (state.status === "loading") {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={GREEN} />
      </SafeAreaView>
    );
  }

  if (state.status === "error") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="text-lg font-bold text-gray-900 mt-4 text-center">
            เปิดโต๊ะนี้ไม่ได้
          </Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">{state.message}</Text>
          <View className="flex-row gap-3 mt-6">
            <Pressable
              onPress={load}
              className="bg-[#00B14F] rounded-xl px-5 py-3 min-h-[44px] justify-center"
            >
              <Text className="text-white font-bold">ลองอีกครั้ง</Text>
            </Pressable>
            <Pressable
              onPress={() => router.back()}
              className="border border-gray-200 rounded-xl px-5 py-3 min-h-[44px] justify-center"
            >
              <Text className="text-gray-700 font-bold">ย้อนกลับ</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const { table, menu } = state;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 pb-3 border-b border-gray-100 flex-row items-center">
        <Pressable onPress={() => router.back()} className="mr-3 w-11 h-11 items-center justify-center -ml-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
            {table.shopName}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <View className="bg-green-50 px-2 py-0.5 rounded border border-green-100 mr-2">
              <Text className="text-green-700 text-[11px] font-bold">
                โต๊ะ {table.tableNumber}
              </Text>
            </View>
            <Text className="text-gray-400 text-xs">{table.seats} ที่นั่ง</Text>
          </View>
        </View>
      </View>

      {menu.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="restaurant-outline" size={40} color="#D1D5DB" />
          <Text className="text-gray-400 text-sm mt-3 text-center">
            ร้านนี้ยังไม่มีเมนูให้เลือก
          </Text>
        </View>
      ) : (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 40).duration(220)}>
              <MenuItemCard item={item} />
            </Animated.View>
          )}
        />
      )}

      <View className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <Text className="text-center text-gray-400 text-xs">
          สั่งอาหารผ่านแอปยังไม่เปิดใช้งาน — เร็วๆ นี้
        </Text>
      </View>
    </SafeAreaView>
  );
}

function MenuItemCard({ item }: { item: RealMenuItem }) {
  return (
    <View className="py-4 border-b border-gray-50">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-4">
          <Text className="text-base font-bold text-gray-800">{item.name}</Text>
          {item.description ? (
            <Text className="text-gray-400 text-xs mt-0.5">{item.description}</Text>
          ) : null}
        </View>
        <Text className="text-gray-800 font-bold">{formatBaht(item.basePrice)}</Text>
      </View>

      {item.modifierGroups.length > 0 && (
        <View className="mt-2 gap-1.5">
          {item.modifierGroups.map((group) => (
            <View key={group.id} className="flex-row flex-wrap items-center">
              <Text className="text-gray-500 text-xs font-medium mr-1.5">
                {group.name}
                {group.isRequired ? " •" : ""}
              </Text>
              {group.options.map((opt, i) => (
                <Text key={opt.id} className="text-gray-400 text-xs">
                  {opt.name}
                  {opt.priceDelta > 0 ? ` (+${formatBaht(opt.priceDelta)})` : ""}
                  {i < group.options.length - 1 ? ", " : ""}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
