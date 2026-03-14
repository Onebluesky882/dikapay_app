import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageCompressor } from "@corasan/image-compressor";

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

      const compressed = ImageCompressor.compress(
        {
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
          fileSize: asset.fileSize ?? 0,
        },
        {
          quality: 80,
          maxHeight: 920,
        },
      );

      setImage(compressed.uri);
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
