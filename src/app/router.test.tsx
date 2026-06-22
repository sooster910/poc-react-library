import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { appRoutes, getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it.each([
    ['/', undefined],
    ['/poc-react-library/', '/poc-react-library'],
    ['/poc-react-library', '/poc-react-library'],
  ])('normalizes %s to %s', (baseUrl, expected) => {
    expect(getRouterBasename(baseUrl)).toBe(expected)
  })
})

describe('appRoutes', () => {
  it('matches the home route when served from a GitHub Pages repository subpath', () => {
    const router = createMemoryRouter(appRoutes, {
      basename: getRouterBasename('/poc-react-library/'),
      initialEntries: ['/poc-react-library/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
  })
})
