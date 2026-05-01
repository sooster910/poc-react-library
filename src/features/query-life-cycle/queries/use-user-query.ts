import { useQuery } from '@tanstack/react-query'

import { mockFetch } from '@/shared/lib/mock-fetch'
import { userKeys } from './queryKey'

export interface User {
  id: number
  name: string
}

export function useUserQuery(userId = 1) {
  return useQuery<User, Error>({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
  })
}

const fetchUser = (userId: number) => {
  return mockFetch<User>({
    resolveFn: () => {
      if (userId === 1) return { id: 1, name: 'John Doe' }
      if (userId === 2) return { id: 2, name: 'Jane Smith' }
      return { id: 3, name: 'Alex Kim' }
    },
    rejectFn: () => new Error('Failed to fetch user'),
    delayMs: 2000,
  })
}
