import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const AUTH_BASE_URL = 'https://dummyjson.com';

export interface LoginBody {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface RefreshBody {
  refreshToken?: string;
  expiresInMins?: number;
}

export const authClient: AxiosInstance = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

type GetState = () => { auth: { accessToken: string | null; refreshToken: string | null } };
type Dispatch = (action: { type: string; payload?: unknown }) => void;

let authGetState: GetState | null = null;
let authDispatch: Dispatch | null = null;

export function setAuthStore(getState: GetState, dispatch: Dispatch): void {
  authGetState = getState;
  authDispatch = dispatch;
}

authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? '';
  if (url.includes('/auth/login') || url.includes('/auth/refresh')) {
    return config;
  }
  const token = authGetState?.()?.auth?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    const refreshToken = authGetState?.()?.auth?.refreshToken;
    if (!refreshToken || !authDispatch) {
      return Promise.reject(error);
    }
    try {
      const res = await authClient.post<RefreshResponse>('/auth/refresh', {
        refreshToken,
        expiresInMins: 30,
      });
      const data = res.data;
      authDispatch({
        type: 'auth/setTokens',
        payload: { accessToken: data.accessToken, refreshToken: data.refreshToken },
      });
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return authClient.request(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

function toUser(res: LoginResponse): AuthUser {
  return {
    id: res.id,
    username: res.username,
    email: res.email,
    firstName: res.firstName,
    lastName: res.lastName,
    gender: res.gender,
    image: res.image,
  };
}

export const authApi = {
  login: (body: LoginBody) =>
    authClient.post<LoginResponse>('/auth/login', body).then((res) => res.data),

  me: (accessToken: string) =>
    authClient
      .get<AuthUser>('/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data),

  refresh: (body?: RefreshBody) =>
    authClient
      .post<RefreshResponse>('/auth/refresh', body ?? {})
      .then((res) => res.data),
};

export { toUser };
