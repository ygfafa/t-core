export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  survey: {
    path: '/survey',
    getHref: () => '/survey',
  },
  loading: {
    path: '/loading',
    getHref: () => '/loading',
  },
  result: {
    path: '/result',
    getHref: () => '/result',
  },
} as const
