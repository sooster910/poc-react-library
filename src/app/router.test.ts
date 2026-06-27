import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps root deployments at the root basename', () => {
    expect(getRouterBasename('/')).toBe('/')
  })

  it('normalizes GitHub Pages repository subpaths', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('uses the pathname from absolute asset base URLs', () => {
    expect(getRouterBasename('https://cdn.example.com/poc-react-library/')).toBe(
      '/poc-react-library',
    )
  })
})
