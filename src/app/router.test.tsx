import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter, getRouterBasename } from '@/app/router'

describe('router', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('does not set a basename for root deployments', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('uses the Vite base path as the router basename', () => {
    expect(getRouterBasename('/poc-react-library/')).toBe('/poc-react-library')
    expect(getRouterBasename('/poc-react-library')).toBe('/poc-react-library')
  })

  it('matches the home route when deployed under a GitHub Pages subpath', async () => {
    window.history.replaceState(null, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
  })
})
