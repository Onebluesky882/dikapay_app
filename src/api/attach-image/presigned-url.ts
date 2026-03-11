import { uploadImageApi } from "..";

export type PresignedUrlDto = {
  userId: string;
  imageType: string;
  mimeType: string;
};
export const uploadImage = {
  presignedUrl: (body: PresignedUrlDto) => {
    return uploadImageApi.post("/api/upload", body);
  },

  clientUpload: async (
    presignedUrl: string,
    blob: Blob,
    userId: string,
    mimeType: string,
  ) => {
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
      userId,
      mimeType,
      success: true,
    };
  },
};
