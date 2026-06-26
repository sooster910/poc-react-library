import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps the root deployment without a basename', () => {
    expect(getRouterBasename('/')).toBeUndefined()
  })

  it('uses the GitHub Pages project path as the router basename', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})
