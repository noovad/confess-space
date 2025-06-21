import axios from "axios";
import axiosAuth from "./axiosAuth";

const axiosApp = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
    withCredentials: true,
});

axiosApp.interceptors.response.use(
    response => response,
    async error => {
        console.log("Axios error intercepted:", error);

        if (error.response && error.response.status === 401) {
            try {
                await axiosAuth.post("/logout").catch(() => { });
            } finally {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);



export default axiosApp;
