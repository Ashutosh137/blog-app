import axios from "axios";

const baseURL = "http://localhost:4000";
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Cache-Control': ' must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

export { axiosInstance };
