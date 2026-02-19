import type { User } from '@/entities/user';

export interface LoginBody {
  username: string;
  password: string;
  expiresInMins?: number;
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

export function toUser(res: LoginResponse): User {
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
