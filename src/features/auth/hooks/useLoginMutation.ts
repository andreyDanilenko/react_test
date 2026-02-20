// exception type for auth/hooks/useLoginMutation
import { useAppDispatch } from '@/app/store/hooks';
import { setAuth, toUser, type LoginBody } from '@/features/auth/model';
import { authApi } from '@/features/auth/api/authApi';

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
