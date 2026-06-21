import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps root deployments without a basename', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('normalizes GitHub Pages base paths for React Router', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/poc-react-library')).toBe('/poc-react-library')
  })
})
