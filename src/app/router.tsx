import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { paths } from '@/config/paths'
import { ProtectedRoute } from '@/lib/auth'

import AppRoot from './pages/app/root'

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
      path: paths.auth.login.path,
      lazy: () => import('./pages/auth/login').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: paths.app.order.path,
          lazy: () => import('./pages/app/order').then(convert(queryClient)),
        },
      ],
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
