import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setAuth, setTokens, logout as logoutAction } from '@/features/auth/model/authSlice';
import { authApi, toUser, type LoginBody } from '@/shared/api/authApi';

export const authKeys = {
  me: (token: string | null) => ['auth', 'me', token] as const,
};

export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginBody) => authApi.login(body),
    onSuccess: (data) => {
      const accessToken = data.accessToken ?? data.token;
      if (!accessToken) return;
      dispatch(
        setAuth({
          user: toUser(data),
          accessToken,
          refreshToken: data.refreshToken,
        })
      );
      queryClient.setQueryData(authKeys.me(accessToken), toUser(data));
    },
  });
}

export function useAuthMeQuery() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  return useQuery({
    queryKey: authKeys.me(accessToken),
    queryFn: () => authApi.me(accessToken!),
    enabled: Boolean(accessToken),
  });
}

export function useRefreshMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const refreshToken = useAppSelector((s) => s.auth.refreshToken);

  return useMutation({
    mutationFn: () =>
      authApi.refresh({ refreshToken: refreshToken ?? undefined, expiresInMins: 30 }),
    onSuccess: (data) => {
      dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useAuth() {
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return { user, accessToken, isAuthenticated: Boolean(accessToken), logout };
}
