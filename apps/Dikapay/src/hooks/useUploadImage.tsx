import { useState } from "react";
import { getMimeType } from "@/utils/getMimeImageType";
import { uploadImage } from "@/api/upload-image/uploadImageApi";
export function useUploadImage() {
  const [loading, setLoading] = useState(false);

  const upload = async (image: string, userId: string) => {
    if (!image) return;
    try {
      setLoading(true);
      const mimeType = getMimeType(image);

      const res = await uploadImage.presignedUrl({
        imageType: "slip",
        userId,
        mimeType,
      });

      await fetch(res.path, {
        method: "PUT",
        headers: {
          "Content-Type": mimeType,
        },
        body: {
          uri: image,
          type: mimeType,
        } as any,
      });
    } catch (error) {
      console.error("upload failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { upload, loading };
}
