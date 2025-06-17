/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getAccessToken = () => localStorage.getItem("accessToken") || "";
const getRefreshToken = () => localStorage.getItem("refreshToken") || "";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    withCredentials: true,
});

export const axiosAuthInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    withCredentials: true,
});

const setAuthHeaders = (config: any) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) config.headers["Authorization"] = accessToken;
    if (refreshToken) config.headers["Refresh-token"] = refreshToken;

    return config;
};

// Pasang interceptor
axiosInstance.interceptors.request.use(setAuthHeaders);
axiosAuthInstance.interceptors.request.use(setAuthHeaders);
