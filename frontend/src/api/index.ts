import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

export const getAPI = ( APIkey : string ): string => {
    return `${import.meta.env.VITE_SERVER_API_URL}${import.meta.env.VITE_BASE_API}${APIkey}`;
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API_URL}${import.meta.env.VITE_BASE_API}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const setupInterceptors = (instance: AxiosInstance) => {
  
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response.data,

    async (error) => {
      if (error.response === undefined && error.code === "ERR_NETWORK") {
        return Promise.reject(error)
      };

      if (error.response.status === 401) {
        // sessionStorage.removeItem("token");
        // window.location.reload();
        return Promise.reject(error);
      }

      // const originalRequest = error.config;

      // if (error.response?.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;

      //   try {
      //     return instance(originalRequest);
      //   } catch (refreshError) {
      //     sessionStorage.removeItem("token");
      //     window.location.reload();
      //     return Promise.reject(refreshError);
      //   }
      // }
    }
  );
};

setupInterceptors(api);

export default api;
