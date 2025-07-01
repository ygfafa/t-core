export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    order: {
      path: 'order',
      getHref: () => '/app/order',
    },
  },
} as const
