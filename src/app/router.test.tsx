import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter, getRouterBasename } from '@/app/router'

describe('getRouterBasename', () => {
  it('normalizes Vite base paths for React Router', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('https://example.com/poc-react-library/')).toBe(
      '/poc-react-library',
    )
  })
})

describe('createAppRouter', () => {
  afterEach(() => {
    cleanup()
    window.history.pushState({}, '', '/')
  })

  it('renders routes under the GitHub Pages repository path', async () => {
    window.history.pushState({}, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
  })
})
