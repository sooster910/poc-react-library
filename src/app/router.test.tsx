import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router basename', () => {
  it('normalizes Vite base paths for React Router', () => {
    expect(getRouterBasename('/')).toBe('/')
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/poc-react-library')).toBe('/poc-react-library')
  })

  it('matches and builds links under a GitHub Pages repository path', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library',
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
})
