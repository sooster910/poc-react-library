import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('router', () => {
  it('normalizes Vite base paths for React Router basenames', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/nested/app/')).toBe('/nested/app')
  })

  it('renders routes when deployed under the GitHub Pages repository path', () => {
    const router = createMemoryRouter(routes, {
      basename: getRouterBasename('/poc-react-library/'),
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
