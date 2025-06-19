/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import axiosAuth from "./axiosAuth";

const axiosApp = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    withCredentials: true,
});

axiosApp.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosApp.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axiosAuth.post("/refresh");
                const newToken = res.data.data.access_token;
                localStorage.setItem("token", newToken || "");
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosApp(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosApp;
