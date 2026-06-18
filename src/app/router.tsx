import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

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

export function getRouterBasename(baseUrl: string) {
  if (!baseUrl || baseUrl === '/') {
    return undefined
  }

  const pathname =
    baseUrl.startsWith('http://') || baseUrl.startsWith('https://')
      ? new URL(baseUrl).pathname
      : baseUrl
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const basename = normalizedPathname.replace(/\/+$/, '')

  return basename || undefined
}

export const router = createBrowserRouter(routes, {
  basename: getRouterBasename(import.meta.env.BASE_URL),
})
