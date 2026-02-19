import { baseApi } from '@/shared/api/baseApi';
import {
  toUser,
  type AuthUser,
  type LoginBody,
  type LoginResponse,
} from '@/shared/api/authTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      LoginBody & { rememberMe?: boolean }
    >({
      query: (body) => {
        // rememberMe used in auth hooks, not sent to API
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripped from request body
        const { rememberMe, ...rest } = body;
        return { url: '/auth/login', method: 'POST', body: rest };
      },
    }),
    me: builder.query<AuthUser, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useMeQuery } = authApi;

export { toUser };
