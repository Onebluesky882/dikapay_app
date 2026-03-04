import { User } from "@/src/types/user.type";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader({ user }: { user: User }) {
  const displayName = user.name || "guest";

  return (
    <View className=" px-4   bg-[#a0ff8c] py-4">
      {/* Top Row */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text style={{ fontSize: 12 }}>Welcome</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            {displayName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            alignItems: "center",
          }}
        >
          <Pressable className="  ">
            <Ionicons name="mail-open" size={28} color="black" />
          </Pressable>
          <Pressable className="  border-2">
            <MaterialIcons name="qr-code-scanner" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
