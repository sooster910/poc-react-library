import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from 'react'

import { queryClient } from '@/shared/lib/query-client'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools
        client={queryClient}
        initialIsOpen={true}
        buttonPosition="bottom-left"
        position="bottom"
      />
    </QueryClientProvider>
  )
}
