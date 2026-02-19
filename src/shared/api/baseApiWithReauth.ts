import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
  type QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
// exception for refresh
import { setTokens, logout } from '@/features/auth/model/authSlice';
import { AUTH_BASE_URL } from '@/shared/api/constants';
import type { RefreshResponse } from '@/shared/api/reauthTypes';

export type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

type AuthStateShape = {
  auth?: {
    accessToken: string | null;
    refreshToken: string | null;
    rememberMe?: boolean;
  };
};

function createBaseQueryWithReauth(
  baseUrl: string,
  endpointsWithoutAuth: string[]
) {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpointsWithoutAuth.includes(endpoint)) return headers;
      const token = (getState() as AuthStateShape).auth?.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  });

  return async function baseQueryWithReauth(
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
  ): Promise<QueryReturnValue<unknown, unknown, object>> {
    let result = await baseQuery(args, api, extraOptions);
    const status = result.error?.status;
    if (status !== 401 && status !== 403) return result;

    const state = api.getState() as AuthStateShape;
    const refreshToken = state.auth?.refreshToken;
    const rememberMe = state.auth?.rememberMe ?? true;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshQuery = fetchBaseQuery({
      baseUrl: AUTH_BASE_URL,
      prepareHeaders: (h) => h,
    });
    const refreshResult = await refreshQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken, expiresInMins: rememberMe ? 30 : 1 },
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
  };
}

export function createBaseApiWithReauth(
  reducerPath: string,
  baseUrl: string,
  endpointsWithoutAuth: string[] = [],
  tagTypes: string[] = []
) {
  return createApi({
    reducerPath,
    baseQuery: createBaseQueryWithReauth(baseUrl, endpointsWithoutAuth),
    tagTypes,
    endpoints: () => ({}),
  });
}
