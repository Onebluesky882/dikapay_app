import {
  ClientUploadDto,
  PresignedUrlDto,
} from "@/src/types/upload-image.type";
import { uploadImageApi } from "..";

export const uploadImage = {
  presignedUrl: (body: PresignedUrlDto) => {
    return uploadImageApi.post("/api/upload", body);
  },

  clientUpload: async (body: ClientUploadDto) => {
    const { presignedUrl, blob, mimeType, userId } = body;
    const res = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": mimeType,
      },
      body: blob,
    });
    if (!res.ok) {
      throw new Error("Upload failed");
    }
    return {
      success: true,
    };
  },
};
