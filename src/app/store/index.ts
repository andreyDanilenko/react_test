import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/model/authSlice';
import { authApi } from '@/features/auth/api/authApi';
import { persistAuthState } from '@/features/auth/lib';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

let prevAuth = store.getState().auth;
store.subscribe(() => {
  const nextAuth = store.getState().auth;
  if (nextAuth === prevAuth) return;
  prevAuth = nextAuth;
  persistAuthState(nextAuth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
