import axios from "axios";

if (!process.env.EXPO_PUBLIC_UPLOAD_IMAGE && !process.env.EXPO_PUBLIC_AUTH) {
  throw new Error("No API URL defined");
}

export const uploadImageApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_UPLOAD_IMAGE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});
