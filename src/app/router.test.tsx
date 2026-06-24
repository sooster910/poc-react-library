import { describe, expect, it } from 'vitest'

import { getRouterBasename } from './router'

describe('getRouterBasename', () => {
  it('does not set a basename for root deployments', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('uses the Vite base path for subpath deployments', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('normalizes base paths without a leading slash', () => {
    expect(getRouterBasename('preview/')).toBe('/preview')
  })
})
