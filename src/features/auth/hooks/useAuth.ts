// exception type for auth/hooks/useAuth
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { logout as logoutAction } from '@/features/auth/model/authSlice';

export function useAuth() {
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const isRehydrated = useAppSelector((s) => s.auth._rehydrated);
  const dispatch = useAppDispatch();

  const logout = () => dispatch(logoutAction());

  return {
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken),
    isRehydrated,
    logout,
  };
}
