import axios from "axios";

const baseURL = "https://blog-app-rqhr.onrender.com";
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Cache-Control": " must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export { axiosInstance };
