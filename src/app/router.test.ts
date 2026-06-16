import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('does not set a basename for root deployments', () => {
    expect(getRouterBasename('/')).toBeUndefined()
  })

  it('uses the Vite base path as the router basename without a trailing slash', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})
