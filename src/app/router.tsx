import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

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

export function getRouterBasename(baseUrl: string) {
  const { pathname } = new URL(baseUrl, 'https://example.com')
  const basename = pathname.replace(/\/+$/, '')

  return basename || undefined
}

export const router = createBrowserRouter(appRoutes, {
  basename: getRouterBasename(import.meta.env.BASE_URL),
})
