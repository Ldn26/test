import axios from "axios";
import useUserStore from "../store/store.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use(  
  (config) => {

    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
   
  (error) => Promise.reject(error)
);

// Handle 401: try refresh token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/refreshToken`,
          {},
          { withCredentials: true } // must be inside the request config
        );

        const newAccessToken = res.data.accessToken;
        useUserStore.getState().SetAccessToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error(err);
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
