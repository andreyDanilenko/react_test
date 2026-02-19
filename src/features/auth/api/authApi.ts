import type { User } from '@/entities/user';
import { baseApi } from '@/shared/api/baseApi';
import type { LoginBody, LoginResponse } from '@/features/auth/model';
import { toUser } from '@/features/auth/model';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      LoginBody & { rememberMe?: boolean }
    >({
      query: (body) => {
        const { rememberMe, ...rest } = body;
        return { url: '/auth/login', method: 'POST', body: rest };
      },
    }),
    me: builder.query<User, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useMeQuery } = authApi;
export { toUser };
