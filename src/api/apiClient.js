import axios from 'axios'
import { API_BASE_URL } from '../constants'
import AuthService from './services/Auth';


const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        common: {
            'Content-Type': 'application/json'
        },
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = AuthService.getAccessToken();

        if (accessToken) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const is401 = error?.response?.status === 401;

    // If we already tried refreshing tokens and it did not succeed, logout and refresh
    if (originalRequest?._retry) {
      AuthService.removeTokens();

      if (window?.location?.href) {
        window.location.href = `${window.location.protocol}//${window.location?.host}/login`;
      }
    }

    if (is401 && !originalRequest?._retry && AuthService.hasTokens()) {
      originalRequest._retry = true;

      await AuthService.refreshTokens();

      // Restart original request after storing access keys
      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
