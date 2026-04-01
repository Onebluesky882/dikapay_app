import { ClientUploadDto, PresignedUrlDto } from "@/types/upload-image.type";
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

    // anathoer api to record image detail

    return {
      success: true,
    };
  },
  // todo
  saveImage: (body: SaveImageDto) => {
    return uploadImageApi.post("/api/image", body);
  },

  // get Images all
  // get image by id and shop id
  // get image by id and profile id
  // get image by id and user id
};
type SaveImageDto = {
  id: string;
};
