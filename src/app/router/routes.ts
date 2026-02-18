export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
  PROFILE: '/profile',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
