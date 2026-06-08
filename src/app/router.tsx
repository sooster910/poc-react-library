import { createBrowserRouter } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

const routes = [
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

export function getRouterBasename(baseUrl: string): string | undefined {
  const normalizedBaseUrl = baseUrl.trim()

  if (!normalizedBaseUrl || normalizedBaseUrl === '/' || normalizedBaseUrl === './') {
    return undefined
  }

  const pathname =
    normalizedBaseUrl.startsWith('http://') || normalizedBaseUrl.startsWith('https://')
      ? new URL(normalizedBaseUrl).pathname
      : normalizedBaseUrl
  const basename = pathname.replace(/^\/+|\/+$/g, '')

  return basename ? `/${basename}` : undefined
}

export function createAppRouter(baseUrl = import.meta.env.BASE_URL) {
  return createBrowserRouter(routes, {
    basename: getRouterBasename(baseUrl),
  })
}

export const router = createAppRouter()
