import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { paths } from '@/config/paths'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, default: Component, ...rest } = m
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    Component,
  }
}

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./pages/index').then(convert(queryClient)),
    },
    {
      path: paths.survey.path,
      lazy: () => import('./pages/survey').then(convert(queryClient)),
    },
    {
      path: paths.loading.path,
      lazy: () => import('./pages/loading').then(convert(queryClient)),
    },
    {
      path: paths.result.path,
      lazy: () => import('./pages/result').then(convert(queryClient)),
    },
    {
      path: '*',
      lazy: () => import('./pages/not-found').then(convert(queryClient)),
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()

  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}
