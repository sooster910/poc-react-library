import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, createAppRouter } from '@/app/router'

describe('app router', () => {
  it('passes the configured basename to the browser router', () => {
    const router = createAppRouter('/poc-react-library/')

    expect(router.basename).toBe('/poc-react-library/')
  })

  it('renders routes and links under a GitHub Pages base path', () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/poc-react-library/',
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
