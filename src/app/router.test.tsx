import { matchRoutes } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it('matches routes when deployed under the Vite base path', () => {
    const basename = getRouterBasename('/poc-react-library/')

    expect(matchRoutes(routes, '/poc-react-library/', basename)).not.toBeNull()
    expect(
      matchRoutes(routes, '/poc-react-library/learning/race-condition', basename),
    ).not.toBeNull()
  })

  it('normalizes the Vite root base path for local and Vercel deployments', () => {
    expect(getRouterBasename('/')).toBe('/')
    expect(getRouterBasename('')).toBe('/')
  })
})
