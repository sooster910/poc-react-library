import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

export function getRouterBasename(baseUrl: string) {
  if (baseUrl === '/' || baseUrl === '') {
    return undefined
  }

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

  return normalizedBaseUrl.startsWith('/') ? normalizedBaseUrl : `/${normalizedBaseUrl}`
}

export const appRoutes = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true, //index true가 무슨 뜻일까?
        element: <HomePage />,
      },
      {
        path: 'learning/race-condition',
        element: <RaceConditionPage />,
      },
      {
        path: 'learning/useQuery-lifecycle',
        element: <UseQueryLifecyclePage />,
      },
    ],
  },
] satisfies RouteObject[]

export const router = createBrowserRouter(appRoutes, {
  basename: getRouterBasename(import.meta.env.BASE_URL),
})
