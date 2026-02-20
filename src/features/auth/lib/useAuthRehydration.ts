import { useEffect } from 'react';
// exception type for auth/hooks/useAuthRehydration
import { useAppDispatch } from '@/app/store/hooks';
import { setAuthFromStorage, setRehydrated } from '@/features/auth/model';
import { getPersistedAuthState } from './authStorage';

export function useAuthRehydration(): void {
  const dispatch = useAppDispatch();
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
