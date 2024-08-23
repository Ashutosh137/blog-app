import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";
const axiosInstance = axios.create({
  baseURL,
  timeout: 65000,
  headers: {
    "Cache-Control": "cache",
    Pragma: "no-cache",
    Expires: "1",
  },
});

export { axiosInstance };
