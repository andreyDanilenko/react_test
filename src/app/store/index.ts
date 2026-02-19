import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/model/authSlice';
import { baseApi } from '@/shared/api/baseApi';
import { persistAuthState } from '@/features/auth/lib';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  } as Record<string, import('redux').Reducer>,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});


// TODO: Remove for production useful only for testing auth in complex ERP systems
// Keep for now as a development aid when user switching is frequently needed 
let prevAuth = store.getState().auth;
store.subscribe(() => {
  const nextAuth = store.getState().auth;
  if (nextAuth === prevAuth) return;
  prevAuth = nextAuth;
  persistAuthState(nextAuth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
