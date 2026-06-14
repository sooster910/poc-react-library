import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('router', () => {
  it('matches GitHub Pages subpath URLs and keeps generated links under that subpath', () => {
    const basename = getRouterBasename('/poc-react-library/')
    const router = createMemoryRouter(appRoutes, {
      basename,
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
