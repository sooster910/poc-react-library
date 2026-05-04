import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it('normalizes the Vite base URL for React Router', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('renders the home route under a Vite base path', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
  })
})
