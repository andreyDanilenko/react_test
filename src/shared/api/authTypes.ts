export const AUTH_BASE_URL = 'https://dummyjson.com';

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

export interface RefreshRequest {
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

export function toUser(res: LoginResponse): AuthUser {
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
