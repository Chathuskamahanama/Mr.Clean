import axios from "axios";

const url = import.meta.env.VITE_API_URI;

const http = axios.create({
  baseURL: `${url}/`,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
