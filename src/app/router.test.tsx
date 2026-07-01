import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { getRouterBasename, routes } from '@/app/router'

describe('getRouterBasename', () => {
  it.each([
    ['/', undefined],
    ['', undefined],
    ['/poc-react-library/', '/poc-react-library'],
    ['poc-react-library', '/poc-react-library'],
  ])('normalizes %s to %s', (baseUrl, expectedBasename) => {
    expect(getRouterBasename(baseUrl)).toBe(expectedBasename)
  })
})

describe('router basename', () => {
  it('renders and prefixes links when deployed under a repository path', () => {
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
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/poc-react-library')
  })
})
