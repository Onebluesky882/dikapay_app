import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const usePickImage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [closeImage, setCloseImage] = useState(false);

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
      setCloseImage(false);
    } finally {
      setLoading(false);
    }
  };
  const clearImage = () => {
    setImage(null);
    setCloseImage(false);
  };

  return {
    loading,
    image,
    closeImage,
    setCloseImage,
    pickImage,
    clearImage,
  };
};
