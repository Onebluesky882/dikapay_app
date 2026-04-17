export type PresignedUrlDto = {
  userId: string;
  imageType: string;
  mimeType: string;
};

export type ClientUploadDto = {
  presignedUrl: string;
  image: string;
  mimeType: string;
};
