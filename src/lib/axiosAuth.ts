/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    withCredentials: true,
});

axiosAuth.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});


export default axiosAuth;
