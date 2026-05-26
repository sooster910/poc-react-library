import { normalizeRouterBasename } from '@/app/router'

describe('normalizeRouterBasename', () => {
  it.each([
    ['/', '/'],
    ['', '/'],
    ['/poc-react-library/', '/poc-react-library'],
    ['poc-react-library', '/poc-react-library'],
    ['/nested/app/', '/nested/app'],
  ])('normalizes Vite base %s for React Router basename', (baseUrl, expectedBasename) => {
    expect(normalizeRouterBasename(baseUrl)).toBe(expectedBasename)
  })
})
