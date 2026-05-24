import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('router', () => {
  it('matches app routes under the GitHub Pages base path', () => {
    const router = createMemoryRouter(appRoutes, {
      basename: getRouterBasename('/poc-react-library/'),
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '레이스 컨디션 데모 열기' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })

  it('keeps the root deployment basename valid', () => {
    expect(getRouterBasename('/')).toBe('/')
  })
})
