import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('router', () => {
  it('uses the Vite base path as a React Router basename', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/poc-react-library')).toBe('/poc-react-library')
  })

  it('matches routes served from a GitHub Pages subpath', () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/poc-react-library')
  })
})
