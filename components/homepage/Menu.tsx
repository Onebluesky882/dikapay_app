import { View, Text } from "react-native";

type MenuProps = {
  menu: Menu[];
};
type Menu = {
  id: string;
  icon: string;
  name: string;
};

export const Menu = ({ menu }: MenuProps) => {
  return (
    <View className="p-2">
      <View className="flex-row flex-wrap justify-between">
        {menu.map((item) => (
          <View
            key={item.id}
            className=" w-[30%] aspect-square rounded-full items-center justify-center"
          >
            <View className="border p-5 rounded-full">
              <Text>{item.id}</Text>
            </View>
            <Text className="text-[12px] text-center">{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
