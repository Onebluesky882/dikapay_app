export type PresignedUrlDto = {
  userId: string;
  imageType: string;
  mimeType: string;
};

export type ClientUploadDto = {
  presignedUrl: string;
  blob: Blob;
  userId: string;
  mimeType: string;
};
