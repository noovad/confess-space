import axios from "axios";

export const axiosAuthInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    withCredentials: true,
});

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    withCredentials: true,
});
