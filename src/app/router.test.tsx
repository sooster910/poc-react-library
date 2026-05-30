import { matchRoutes } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps root base path for local and root deployments', () => {
    expect(getRouterBasename('/')).toBe('/')
    expect(getRouterBasename('')).toBe('/')
  })

  it('normalizes Vite subdirectory base paths for GitHub Pages', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('poc-react-library/')).toBe('/poc-react-library')
  })
})

describe('appRoutes', () => {
  it('matches the deployed GitHub Pages root URL under the configured basename', () => {
    const basename = getRouterBasename('/poc-react-library/')
    const matches = matchRoutes(appRoutes, '/poc-react-library/', basename)

    expect(matches?.at(-1)?.pathname).toBe('/')
  })

  it('matches nested learning routes under the configured basename', () => {
    const basename = getRouterBasename('/poc-react-library/')
    const matches = matchRoutes(appRoutes, '/poc-react-library/learning/race-condition', basename)

    expect(matches?.at(-1)?.pathname).toBe('/learning/race-condition')
  })

  it('does not match GitHub Pages URLs without the deployment basename', () => {
    expect(matchRoutes(appRoutes, '/poc-react-library/')).toBeNull()
  })
})
