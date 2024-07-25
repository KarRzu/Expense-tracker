export type Routes = typeof ROUTES;

export const ROUTES = {
  dashboard: "/",
  auth: "/auth",
  notFound: "/404",
  expenses: "/expenses",
  settings: "/settings",
  raports: "/raports",
} as const;
