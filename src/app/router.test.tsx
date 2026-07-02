import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, normalizeRouterBasename } from '@/app/router'

describe('app router', () => {
  it('normalizes Vite base paths for React Router', () => {
    expect(normalizeRouterBasename('/')).toBe('/')
    expect(normalizeRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('matches routes and builds links under the GitHub Pages base path', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: '프론트엔드 학습과 실험을 위한 기본 프로젝트',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })
})
