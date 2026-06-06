import { render, screen } from '@testing-library/react'
import { createMemoryRouter, matchRoutes, RouterProvider } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('app router', () => {
  it('normalizes the Vite base path for React Router', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })

  it('matches the home route when the app is served from a GitHub Pages subpath', () => {
    const basename = getRouterBasename('/poc-react-library/')
    const matches = matchRoutes(appRoutes, { pathname: '/poc-react-library/' }, basename)
    const homeRoute = appRoutes[0].children[0]

    expect(matches).toHaveLength(2)
    expect(matches?.at(-1)?.route).toBe(homeRoute)
  })

  it('prefixes navigation links with the deployment subpath', () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/poc-react-library',
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
