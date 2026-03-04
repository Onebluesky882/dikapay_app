import { User } from "@/src/types/user.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader({ user }: { user: User }) {
  const displayName = user.name || "guest";
  const points = 120; // mock คะแนน

  return (
    <View
      style={{
        marginBottom: -55,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}
      className="mx-4 my-4 py-6 px-4 rounded-2xl"
    >
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

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#111" : "#000",
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 14,
          })}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>สแกน QR</Text>
        </Pressable>
      </View>

      {/* Section คะแนนสะสม */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#F1F5F9",
          padding: 16,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Icon + Text */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
