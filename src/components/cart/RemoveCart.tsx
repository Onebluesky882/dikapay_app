import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type RemoveCartProp = {
  setConfirmDelete: (value: boolean) => void;
  handleClearCart: () => void;
};

export function RemoveCart({
  setConfirmDelete,
  handleClearCart,
}: RemoveCartProp) {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 items-center justify-center z-50">
      <View className="bg-white w-[85%] rounded-2xl p-6 shadow-xl">
        {/* icon */}
        <View className="items-center mb-3">
          <Ionicons name="trash-outline" size={34} color="#ef4444" />
        </View>

        {/* title */}
        <Text className="text-center text-lg font-bold text-gray-900">
          ลบสินค้าทั้งหมด ?
        </Text>

        {/* description */}
        <Text className="text-center text-gray-400 mt-1 mb-6">
          รายการอาหารทั้งหมดในตะกร้าจะถูกลบ
        </Text>

        {/* buttons */}
        <View className="flex-row gap-3">
          {/* cancel */}
          <Pressable
            onPress={() => setConfirmDelete(false)}
            className="flex-1 h-11 items-center justify-center rounded-xl bg-gray-100"
          >
            <Text className="text-gray-600 font-medium">ยกเลิก</Text>
          </Pressable>

          {/* confirm */}
          <Pressable
            onPress={handleClearCart}
            className="flex-1 h-11 items-center justify-center rounded-xl bg-red-500"
          >
            <Text className="text-white font-semibold">ลบทั้งหมด</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
