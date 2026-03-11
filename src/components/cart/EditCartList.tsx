import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type EditMenuCartProps = {
  addItem: () => void;
  minusItem: () => void;
  num: number;
};

export const EditMenuCart = ({
  addItem,
  minusItem,
  num,
}: EditMenuCartProps) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-1 py-1">
      <Pressable
        onPress={minusItem}
        className="w-5 h-5 items-center justify-center rounded-full bg-white"
      >
        <AntDesign name="minus" size={14} color={"#36cd5e"} />
      </Pressable>

      <Text className="mx-3 text-gray-800 font-semibold text-sm">{num}</Text>

      <Pressable
        onPress={addItem}
        className="w-5 h-5 items-center justify-center rounded-full bg-white"
      >
        <AntDesign name="plus" size={14} color={"#36cd5e"} />
      </Pressable>
    </View>
  );
};
