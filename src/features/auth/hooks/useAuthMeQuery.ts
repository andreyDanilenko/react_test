import { useAppSelector } from '@/app/store/hooks';
import { authApi } from '@/features/auth/api/authApi';

export function useAuthMeQuery() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  return authApi.useMeQuery(undefined, { skip: !accessToken });
}
