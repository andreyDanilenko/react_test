import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
  type QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
import { setTokens, logout } from '@/features/auth/model/authSlice';
import {
  AUTH_BASE_URL,
  toUser,
  type AuthUser,
  type LoginBody,
  type LoginResponse,
  type RefreshResponse,
} from '@/shared/api/authTypes';

const baseQuery = fetchBaseQuery({
  baseUrl: AUTH_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (endpoint === 'login' || endpoint === 'refresh') return headers;
    const state = getState() as { auth?: { accessToken: string | null } };
    const token = state.auth?.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<QueryReturnValue<unknown, unknown, object>> {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status !== 401) return result;

  const state = api.getState() as { auth?: { refreshToken: string | null } };
  const refreshToken = state.auth?.refreshToken;
  if (!refreshToken) {
    api.dispatch(logout());
    return result;
  }

  const refreshResult = await baseQuery(
    {
      url: '/auth/refresh',
      method: 'POST',
      body: { refreshToken, expiresInMins: 30 },
    },
    api,
    extraOptions
  );

  if (refreshResult.data) {
    const data = refreshResult.data as RefreshResponse;
    api.dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
  }
  return result;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      LoginBody & { rememberMe?: boolean }
    >({
      query: (body) => {
        const { rememberMe: _rem, ...rest } = body;
        return { url: '/auth/login', method: 'POST', body: rest };
      },
    }),
    me: builder.query<AuthUser, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = authApi;

export { toUser };
