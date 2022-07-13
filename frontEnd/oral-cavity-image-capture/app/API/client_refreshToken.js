import axios from "axios";
import * as SecureStore from "expo-secure-store";
import config from "../../config";

let headers = {};

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.2:3000/api",
  // baseURL: "http://192.168.1.2:3000/api",
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("refresh");
    console.log("refresh token is " + token + "\n");
    if (token) {
      config.headers.refresh_token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
