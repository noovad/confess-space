/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getAccessToken = () => localStorage.getItem("accessToken") || "";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config: any) => {
    const accessToken = getAccessToken();
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
});

export const axiosAuthInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    withCredentials: true,
});
