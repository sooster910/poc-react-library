import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router base path', () => {
  it('matches routes and links under a deployed subpath', () => {
    const basename = getRouterBasename('/poc-react-library/')
    const router = createMemoryRouter(routes, {
      basename,
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '레이스 컨디션 데모 열기' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })

  it('does not add a basename for root deployments', () => {
    expect(getRouterBasename('/')).toBeUndefined()
  })
})
