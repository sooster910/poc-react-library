import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('getRouterBasename', () => {
  it('keeps local root deployments without a basename', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('normalizes Vite base paths for React Router', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('poc-react-library')).toBe('/poc-react-library')
  })
})

describe('routes', () => {
  it('matches the home route when deployed below a repository base path', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
  })
})
