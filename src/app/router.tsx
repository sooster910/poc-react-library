import { createBrowserRouter } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home/ui/home-page'
import { RaceConditionPage } from '@/pages/learning/ui/race-condition-page'
import { UseQueryLifecyclePage } from '@/pages/learning/ui/use-query-lifecycle-page'

export function getRouterBasename(baseUrl: string): string | undefined {
  const basePath = baseUrl.startsWith('http') ? new URL(baseUrl).pathname : baseUrl
  const normalizedBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`
  const basename = normalizedBasePath.replace(/\/+$/, '')

  return basename === '' ? undefined : basename
}

export const router = createBrowserRouter([
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
], {
  basename: getRouterBasename(import.meta.env.BASE_URL),
})
