import { createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from '@/shared/api/authApi';

export type { AuthUser };

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberMe: boolean;
  _rehydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  rememberMe: true,
  _rehydrated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: {
        payload: {
          user: AuthUser;
          accessToken: string;
          refreshToken?: string;
          rememberMe?: boolean;
        };
      }
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      if (action.payload.rememberMe !== undefined) state.rememberMe = action.payload.rememberMe;
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
    setRehydrated: (state, action: { payload: boolean }) => {
      state._rehydrated = action.payload;
    },
    setAuthFromStorage: (
      state,
      action: {
        payload: {
          accessToken: string;
          refreshToken?: string | null;
          user?: AuthUser | null;
          rememberMe: boolean;
        };
      }
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.user = action.payload.user ?? null;
      state.rememberMe = action.payload.rememberMe;
    },
  },
});

export const { setAuth, setTokens, logout, setRehydrated, setAuthFromStorage } = authSlice.actions;
