import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter, getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('normalizes Vite base paths for React Router', () => {
    expect(getRouterBasename('/')).toBe('/')
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('https://example.com/poc-react-library/')).toBe(
      '/poc-react-library',
    )
  })
})

describe('createAppRouter', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/')
  })

  it('keeps navigation links under the configured deployment subpath', () => {
    window.history.pushState(null, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/poc-react-library/',
    )
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
    expect(screen.getByRole('link', { name: 'useQuery Lifecycle' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/useQuery-lifecycle',
    )
  })
})
