import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const CreateShopScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateShop = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 replace with your API
      await new Promise((r) => setTimeout(r, 1200));

      Alert.alert("Success", "Shop created 🎉");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ---------------- Header ---------------- */}
        <View className="items-center mb-10">
          <View className="w-16 h-16 rounded-2xl bg-indigo-600 items-center justify-center mb-4">
            <Svg width={28} height={28} viewBox="0 0 24 24">
              <Path
                d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            </Svg>
          </View>

          <Text className="text-2xl font-bold text-gray-900">Create Shop</Text>
          <Text className="text-gray-500 mt-1 text-center">
            Setup your store to start receiving payments
          </Text>
        </View>

        {/* ---------------- Form ---------------- */}
        <View className="gap-5">
          {/* Shop Name */}
          <Input
            label="Shop Name *"
            placeholder="My Coffee Shop"
            value={name}
            onChangeText={setName}
          />

          {/* Phone */}
          <Input
            label="Phone *"
            placeholder="0812345678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Category */}
          <Input
            label="Category"
            placeholder="Cafe / Restaurant / Retail"
            value={category}
            onChangeText={setCategory}
          />

          {/* Address */}
          <Input
            label="Address"
            placeholder="Shop address"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          {/* Logo upload mock */}
          <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-xl h-28 items-center justify-center">
            <Text className="text-gray-400">Upload Shop Logo</Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleCreateShop}
            className="bg-indigo-600 h-14 rounded-xl items-center justify-center mt-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">
                Create Shop
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateShopScreen;

/* ---------------- Reusable Input ---------------- */

type InputProps = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
}) => {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-gray-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        className={`border border-gray-300 rounded-xl px-4 ${
          multiline ? "h-24 pt-3" : "h-12"
        }`}
      />
    </View>
  );
};
