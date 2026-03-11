import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

type UploadImageProps = {
  pickImage: () => void;
  handleCloseImage: () => void;
  image: string | null;
  loading: boolean;
  handleSubmitPresigned: () => Promise<void>;
};
export function UploadImage({
  pickImage,
  handleCloseImage,
  image,
  loading,
  handleSubmitPresigned,
}: UploadImageProps) {
 

  return (
    <View className="p-4   rounded-xl">
      <Text className="text-lg font-semibold mb-3">Upload Image</Text>

      <Pressable
        onPress={pickImage}
        style={{ height: image ? 440 : 100 }}
        className={` border-2 p-1 border-dashed border-gray-300 rounded-lg items-center justify-center`}
      >
        {image ? (
          <>
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-lg relative"
              resizeMode="contain"
            />
            <Pressable
              onPress={handleCloseImage}
              className="absolute right-0 top-0"
            >
              <Ionicons name="close-circle-sharp" size={24} color="black" />
            </Pressable>
          </>
        ) : (
          <Text>Select image</Text>
        )}
      </Pressable>

      {loading && <ActivityIndicator />}

      {image && (
        <View className="flex-row gap-3 mt-4">
          {/* ปุ่มเคลียร์ */}
          <Pressable
            onPress={handleCloseImage}
            disabled={!image}
            className="flex-1 bg-gray-300 py-3 rounded-lg items-center"
          >
            <Text className="font-semibold text-gray-800">เคลียร์</Text>
          </Pressable>

          {/* ปุ่มส่งสลิป */}
          <Pressable
            onPress={handleSubmitPresigned}
            disabled={!image || loading}
            className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">ส่งสลิป</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}
