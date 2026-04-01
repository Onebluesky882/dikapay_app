import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { loadImage } from "react-native-nitro-image";
export const usePickImage = () => {
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
      // 1. load image
      const fileImage = await loadImage({
        filePath: asset.uri,
      });

      if (fileImage.height === 0) return;

      const newHeight = 920;

      const newWidth = Math.round(
        (fileImage.width / fileImage.height) * newHeight,
      );

      const resized = fileImage.resize(newWidth, newHeight);

      // 2. compress (native)
      const compressedPath = await resized.saveToTemporaryFileAsync("jpg", 70);

      setImage(compressedPath);
    } catch (error) {
      console.error("Image compression failed", error);
    }
  };

  const clearImage = async () => {
    setImage(null);
  };

  return {
    image,
    pickImage,
    clearImage,
  };
};
