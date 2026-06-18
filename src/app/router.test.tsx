import { matchRoutes } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it('derives a React Router basename from the Vite base path', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('poc-react-library/')).toBe('/poc-react-library')
  })

  it('matches GitHub Pages URLs served from the repository subpath', () => {
    const basename = getRouterBasename('/poc-react-library/')

    expect(matchRoutes(routes, '/poc-react-library/', basename)?.at(-1)?.route.index).toBe(true)
    expect(
      matchRoutes(routes, '/poc-react-library/learning/race-condition', basename)?.at(-1)?.route
        .path,
    ).toBe('learning/race-condition')
  })
})
