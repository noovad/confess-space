import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    withCredentials: true,
});


export default axiosAuth;
