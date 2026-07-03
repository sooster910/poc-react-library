import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { routes } from '@/app/router'

describe('app router', () => {
  it('matches the home route under the configured base path', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library/',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/poc-react-library/',
    )
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })

  it('matches nested learning routes under the configured base path', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library/',
      initialEntries: ['/poc-react-library/learning/useQuery-lifecycle'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('useQuery 라이프사이클 (준비 중)')).toBeInTheDocument()
  })
})
