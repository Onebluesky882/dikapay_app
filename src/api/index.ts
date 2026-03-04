import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("No API URL defined");
}

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
