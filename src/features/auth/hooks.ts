import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setAuth, logout as logoutAction } from '@/features/auth/model/authSlice';
import { authApi } from '@/features/auth/api/authApi';
import { toUser, type LoginBody } from '@/features/auth/model';

export type LoginMutationPayload = LoginBody & { rememberMe?: boolean };

export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const [loginTrigger, result] = authApi.useLoginMutation();

  const mutateAsync = (payload: LoginMutationPayload) =>
    loginTrigger(payload)
      .unwrap()
      .then((data) => {
        const accessToken = data.accessToken ?? data.token;
        if (accessToken) {
          dispatch(
            setAuth({
              user: toUser(data),
              accessToken,
              refreshToken: data.refreshToken,
              rememberMe: payload.rememberMe ?? true,
            })
          );
        }
        return data;
      });

  return {
    mutateAsync,
    isPending: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
}

export function useAuthMeQuery() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  return authApi.useMeQuery(undefined, { skip: !accessToken });
}

export function useAuth() {
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const isRehydrated = useAppSelector((s) => s.auth._rehydrated);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken),
    isRehydrated,
    logout,
  };
}
