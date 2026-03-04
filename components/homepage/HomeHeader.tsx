import { User } from "@/src/types/user.type";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader({ user }: { user: User }) {
  const displayName = user.name || "guest";
  const points = 120; // mock คะแนน

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

        <Pressable className="  border-2">
          <MaterialIcons name="qr-code-scanner" size={24} color="black" />
        </Pressable>
      </View>

      {/* Section คะแนนสะสม */}
      <View
        className=" mt-4 shadow-md border border-gray-100 bg-white p-8"
        style={{
          padding: 16,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Icon + Text */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFE8B6",
              padding: 10,
              borderRadius: 50,
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons
              name="teddy-bear"
              size={24}
              color="#F59E0B"
            />
          </View>

          <View>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>คะแนนสะสม</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              {points} แต้ม
            </Text>
            <Text>
              {" "}
              ครบ 1000 แต้ม แลกรับส่วนลด{" "}
              <Text className="text-red-500">5 บาท</Text>{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
