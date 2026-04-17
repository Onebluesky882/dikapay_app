import { recommendedShops } from "@/mocks/home.mock";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type RecommendCardProps = {
  handleShopRouter: (id: string) => void;
};
export const RecommendedCard = ({ handleShopRouter }: RecommendCardProps) => {
  return (
    <View style={{ marginTop: 12 }}>
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          ร้านค้าแนะนำใกล้คุณ
        </Text>
      </View>

      <FlatList
        data={recommendedShops}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 12,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              marginRight: 16,
              width: 220,
              elevation: 3,
            }}
            onPress={() => handleShopRouter(item.id)}
          >
            <View
              style={{
                height: 130,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            <View style={{ padding: 12 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: "#6b7280", marginTop: 4 }}>
                {item.category}
              </Text>
              <Text style={{ color: "#f59e0b", marginTop: 6 }}>
                ⭐ {item.rating}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
