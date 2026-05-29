import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps root deployments mounted at the domain root', () => {
    expect(getRouterBasename('/')).toBe('/')
  })

  it('matches the GitHub Pages repository subpath from Vite base URL', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})

describe('routes', () => {
  it('renders and links correctly when hosted from a subpath', () => {
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
