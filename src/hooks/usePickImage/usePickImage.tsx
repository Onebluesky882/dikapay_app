import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "react-native-compressor";
export const usePickImage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    if (!asset) return;

    try {
      setLoading(true);
      const compressed = await Image.compress(asset.uri, {
        compressionMethod: "auto",
        maxHeight: 920,
      });
      // todo
      setImage(compressed);
    } catch (error) {
      console.error("Image compression failed", error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
  };

  return {
    loading,
    image,
    pickImage,
    clearImage,
  };
};
