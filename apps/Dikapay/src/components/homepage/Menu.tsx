import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type MenuProps = {
  menu: Menu[];
  checkUser: () => void;
};

type Menu = {
  id: string;
  icon: any;
  name: string;
};

export const Menu = ({ menu, checkUser }: MenuProps) => {
  return (
    <View className=" ">
      <View className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <View className="flex-row flex-wrap justify-between">
          {menu.map((item) => (
            <Pressable
              onPress={checkUser}
              key={item.id}
              className="w-[32%] mb-5 items-center"
            >
              {/* Circle Button */}
              <View className="w-20 h-20 bg-indigo-50 rounded-full items-center justify-center">
                <Ionicons name={item.icon} size={26} color="#4F46E5" />
              </View>

              {/* Label */}
              <Text className="text-xs mt-2 text-gray-700 font-medium text-center">
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};
