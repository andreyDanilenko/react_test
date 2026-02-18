import { createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from '@/shared/api/authApi';

export type { AuthUser };

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: { payload: { user: AuthUser; accessToken: string; refreshToken?: string } }) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
    },
    setTokens: (state, action: { payload: { accessToken: string; refreshToken?: string } }) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken != null) state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuth, setTokens, logout } = authSlice.actions;
