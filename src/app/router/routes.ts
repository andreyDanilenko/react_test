export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
