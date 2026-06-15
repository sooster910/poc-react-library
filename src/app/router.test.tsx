import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('getRouterBasename', () => {
  it('does not set a basename for root builds', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('normalizes a Vite base path for React Router', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('docs/app')).toBe('/docs/app')
  })
})

describe('routes', () => {
  it('matches and links correctly when the app is served from a subpath', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })
})
