import { ScrollView, Text, View } from "react-native";
import { EditMenuCart } from "./EditCartList";

type Cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  category?: string;
};

type Props = {
  cartItems: Cart[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
};

export function CartList({ cartItems, addItem, removeItem }: Props) {
  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <View className=" bg-gray-50 ">
      {cartItems.length > 0 && (
        <View className="bg-white rounded-xl shadow p-4 ">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold">รายการอาหาร</Text>
          </View>

          {/* Cart Items */}
          <ScrollView className="space-y-3">
            {cartItems.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between items-center border-b border-gray-200 pb-2 mb-2"
              >
                <View>
                  <Text className="font-semibold text-base">{item.name}</Text>
                  <Text className="text-sm text-gray-500">
                    {item.price} x {item.quantity}
                  </Text>
                </View>
                <View className="     items-center  ">
                  <Text className="font-bold text-green-600">
                    {item.total} ฿
                  </Text>
                  <EditMenuCart
                    num={item.quantity}
                    addItem={() => addItem(item.id)}
                    minusItem={() => removeItem(item.id)}
                  />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Total */}
          <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
            <Text className="font-bold text-lg">รวม</Text>
            <Text className="font-bold text-xl text-green-700">
              {grandTotal} ฿
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
