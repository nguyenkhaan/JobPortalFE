import axios from "axios";
import { CookiesService } from "../services/cookieServices";
import { TokenType } from "../bases/enums/jwt.enum";

const publicApi = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});
const privateApi = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

let isRefreshing = false;

privateApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = CookiesService.getToken(TokenType.REFRESH_TOKEN);
          if (!refreshToken) throw new Error("No refresh token");
          const res = await axios.post(
            "http://localhost:8080/api/auth/refresh",
            {
              refreshToken,
            },
          );

          const newAccessToken = res.data.value.accessToken;
          CookiesService.saveToken(newAccessToken, TokenType.ACCESS_TOKEN);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateApi(originalRequest);
        } catch (refreshError) {
          CookiesService.removeCookie(TokenType.ACCESS_TOKEN);
          CookiesService.removeCookie(TokenType.REFRESH_TOKEN);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  },
);
privateApi.interceptors.request.use(
  (config) => {
    const token = CookiesService.getToken(TokenType.ACCESS_TOKEN);
    if (token && config["headers"]) {
      {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
privateApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response.status;
    if (status === 401) {
      console.log("Invalid Session. Please login again");
    }
    return Promise.reject(error);
  },
);
export { publicApi, privateApi };
