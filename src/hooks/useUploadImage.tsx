import { useState } from "react";
import { uploadImage } from "@/api/attach-image/presigned-url";
import { getMimeType } from "@/utils/getMimeImageType";
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

      const file = await fetch(image);
      const blob = await file.blob();

      // 3. upload to S3
      await uploadImage.clientUpload({
        presignedUrl: res.data.path,
        blob,
        mimeType,
        userId,
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
