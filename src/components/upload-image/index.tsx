import {
  PresignedUrlDto,
  uploadImage,
} from "@/src/api/attach-image/presigned-url";
import { useAuthStore } from "@/src/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
function getMimeType(uri: string): string {
  const ext = uri.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}
export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [closeImage, setCloseImage] = useState(false);

  const user = useAuthStore((state) => state.user);
  const userId = String(user?.id);
  useEffect(() => {}, [image, userId]);

  const handleSubmitPresigned = async () => {
    if (!image) return;

    const body: PresignedUrlDto = {
      imageType: "shop",
      userId,
      mimeType: getMimeType(image),
    };

    const res = await uploadImage.presignedUrl(body);
    const file = await fetch(image);
    const blob = await file.blob();
    const data = await uploadImage.clientUpload(
      res.data.path,
      blob,
      userId,
      body.mimeType,
    );
    if (data) {
      setImage("");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    try {
      setLoading(true);

      const uri = result.assets[0].uri;

      const rendered = await ImageManipulator.manipulate(uri)
        .resize({ height: 920 })
        .renderAsync();

      const compressed = await rendered.saveAsync({
        compress: 0.8,
        format: SaveFormat.JPEG,
      });

      setImage(compressed.uri);
      if (closeImage) {
        setCloseImage(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4   rounded-xl">
      <Text className="text-lg font-semibold mb-3">Upload Image</Text>

      <Pressable
        onPress={pickImage}
        style={{ height: image && !closeImage ? 440 : 100 }}
        className={` border-2 p-1 border-dashed border-gray-300 rounded-lg items-center justify-center`}
      >
        {image && !closeImage ? (
          <>
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-lg relative"
              resizeMode="contain"
            />
            <Pressable
              onPress={() => setCloseImage(true)}
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

      <Pressable onPress={handleSubmitPresigned}>
        <Text>click</Text>
      </Pressable>
    </View>
  );
}
const SubmitPresignedUrl = () => {};
