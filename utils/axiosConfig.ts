import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{ message: string }>) {
    if (error.response?.data.message.includes("jwt")) {
      // window.location.href = window.location.origin + "/login";
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
