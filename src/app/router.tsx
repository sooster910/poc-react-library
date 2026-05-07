import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

export const routes = [
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

const routerBasename =
  import.meta.env.BASE_URL.length > 1
    ? import.meta.env.BASE_URL.replace(/\/$/, '')
    : import.meta.env.BASE_URL

export const router = createBrowserRouter(routes, {
  basename: routerBasename,
})
