import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter, getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('does not add a basename for root or relative Vite bases', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('./')).toBeUndefined()
  })

  it('normalizes a Vite subpath base for React Router', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
  })
})

describe('createAppRouter', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/')
  })

  it('matches routes and generates links under the GitHub Pages base path', async () => {
    window.history.pushState(null, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })
})
