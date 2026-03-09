import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;
const authURL = process.env.EXPO_PUBLIC_AUTH;

if (!baseURL) {
  throw new Error("No API URL defined");
}

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: authURL,
  headers: {
    "Content-Type": "application/json",
  },
});
