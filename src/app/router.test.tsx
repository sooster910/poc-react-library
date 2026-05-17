import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps the root base path for local and Vercel deployments', () => {
    expect(getRouterBasename('/')).toBe('/')
  })

  it('normalizes the GitHub Pages base path for React Router', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})
