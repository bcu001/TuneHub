import axios from 'axios';
import { server_url } from '@/config/env';

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
const tokenListeners = new Set<(token: string | null) => void>();

export const getAxiosAccessToken = () => accessToken;

export const setAxiosAccessToken = (token: string | null) => {
  accessToken = token;
  tokenListeners.forEach((listener) => listener(token));
};

export const onAccessTokenChange = (
  listener: (token: string | null) => void
) => {
  tokenListeners.add(listener);
  return () => {
    tokenListeners.delete(listener);
  };
};

const api = axios.create({
  baseURL: `${server_url}`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (requestError) => {
    const originalRequest = requestError.config;

    const isSignInRequest = originalRequest?.url?.endsWith('/auth/signin');
    const isRefreshRequest = originalRequest?.url?.endsWith('/auth/refresh');

    if (
      requestError.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isSignInRequest &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            try {
              const refreshResponse = await axios.post(
                `${server_url}/auth/refresh`,
                {},
                { withCredentials: true }
              );
              const newToken = refreshResponse.data?.data?.accessToken;
              if (!newToken) {
                throw new Error('No access token in refresh response');
              }
              setAxiosAccessToken(newToken);
              return newToken;
            } catch (err) {
              setAxiosAccessToken(null);
              throw err;
            } finally {
              refreshPromise = null;
            }
          })();
        }

        const newAccessToken = await refreshPromise;
        if (!newAccessToken) {
          return Promise.reject(requestError);
        }

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        return Promise.reject(requestError);
      }
    }

    return Promise.reject(requestError);
  }
);

export default api;
