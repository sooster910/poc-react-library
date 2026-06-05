import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('leaves root deployments without a basename', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('uses the Vite base path as the React Router basename', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/poc-react-library')).toBe('/poc-react-library')
  })
})
