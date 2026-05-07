import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { routes } from '@/app/router'

describe('router', () => {
  it('matches routes when the app is served from a subdirectory', () => {
    const router = createMemoryRouter(routes, {
      basename: '/poc-react-library',
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
  })
})
