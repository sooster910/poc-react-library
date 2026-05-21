import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it.each([
    ['/', undefined],
    ['/poc-react-library/', '/poc-react-library'],
    ['/nested/base/path/', '/nested/base/path'],
  ])('normalizes base URL %s to router basename %s', (baseUrl, basename) => {
    expect(getRouterBasename(baseUrl)).toBe(basename)
  })

  it('matches routes and builds links when served from a subpath', () => {
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
