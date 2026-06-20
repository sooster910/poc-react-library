import { getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps the root base URL unchanged for root deployments', () => {
    expect(getRouterBasename('/')).toBe('/')
  })

  it('removes the trailing slash from repository base URLs', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})
