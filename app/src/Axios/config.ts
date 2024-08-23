import axios from "axios";

const baseURL = "https://blog-app-rqhr.onrender.com/";
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
