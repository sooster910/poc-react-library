import { createMemoryRouter } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it('uses root basename for root-hosted builds', () => {
    expect(getRouterBasename('/')).toBe('/')
  })

  it('normalizes Vite base paths for React Router basename', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('matches learning routes when the app is hosted under a GitHub Pages subpath', () => {
    const router = createMemoryRouter(routes, {
      basename: getRouterBasename('/poc-react-library/'),
      initialEntries: ['/poc-react-library/learning/race-condition'],
    })

    expect(router.state.matches.some(({ route }) => route.path === 'learning/race-condition')).toBe(
      true,
    )
  })
})
