import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/model/authSlice';
import { persistAuthState } from '@/features/auth/lib';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

store.subscribe(() => persistAuthState(store.getState().auth));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
