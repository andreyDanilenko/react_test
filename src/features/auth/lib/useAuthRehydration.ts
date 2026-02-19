import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthFromStorage, setRehydrated } from '@/features/auth/model/authSlice';
import { getPersistedAuthState } from './authStorage';

export function useAuthRehydration(): void {
  const dispatch = useDispatch();
  useEffect(() => {
    const persisted = getPersistedAuthState();
    if (persisted?.accessToken) {
      dispatch(
        setAuthFromStorage({
          accessToken: persisted.accessToken,
          refreshToken: persisted.refreshToken,
          user: persisted.user,
          rememberMe: persisted.rememberMe,
        })
      );
    }
    dispatch(setRehydrated(true));
  }, [dispatch]);
}
