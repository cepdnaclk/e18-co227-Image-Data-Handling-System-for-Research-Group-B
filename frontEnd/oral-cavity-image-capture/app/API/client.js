import axios from "axios";
import * as SecureStore from "expo-secure-store";

let headers = {};

const axiosInstance = axios.create({
  baseURL: "http://192.168.8.153:3000/api",
  headers,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('access');
        console.log("access token is " + token);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
