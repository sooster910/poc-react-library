import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

export function getRouterBasename(baseUrl = import.meta.env.BASE_URL) {
  const basename = baseUrl.replace(/\/+$/, '')

  return basename === '' ? undefined : basename
}

export const routes: RouteObject[] = [
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
]

export const router = createBrowserRouter(routes, {
  basename: getRouterBasename(),
})
