import axios, { type AxiosInstance } from 'axios';

const AUTH_BASE_URL = 'https://dummyjson.com';

export const authClient: AxiosInstance = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

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
  token: string;
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshBody {
  refreshToken?: string;
  expiresInMins?: number;
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
    authClient.post<LoginResponse>('/auth/refresh', body ?? {}).then((res) => res.data),
};
