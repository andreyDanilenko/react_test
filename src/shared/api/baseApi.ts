import { createBaseApiWithReauth } from '@/shared/api/baseApiWithReauth';
import { AUTH_BASE_URL } from '@/shared/api/constants';

export const baseApi = createBaseApiWithReauth(
  'api',
  AUTH_BASE_URL,
  ['login', 'refresh'],
  ['Products']
);
