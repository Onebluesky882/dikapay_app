import { ClientUploadDto, PresignedUrlDto } from "@/types/upload-image.type";
import { createRequest } from "..";

const UPLOAD_URL = process.env.EXPO_PUBLIC_UPLOAD_IMAGE!;

if (!UPLOAD_URL) {
  throw new Error("No API UPLOAD_URL defined");
}

const uploadImageApi = createRequest(UPLOAD_URL);

export const uploadImage = {
  presignedUrl: (body: PresignedUrlDto) =>
    uploadImageApi("/api/upload", {
      method: "POST",
      body,
    }),

  clientUpload: async (body: ClientUploadDto) => {
    const { presignedUrl, blob, mimeType } = body;

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
  // todo
  saveImage: (body: SaveImageDto) =>
    uploadImageApi("/api/image", {
      method: "POST",
      body,
    }),
  // get Images all
  // get image by id and shop id
  // get image by id and profile id
  // get image by id and user id
};
type SaveImageDto = {
  id: string;
};
