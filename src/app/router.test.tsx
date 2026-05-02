import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter } from '@/app/router'

describe('router', () => {
  const originalUrl = window.location.href

  afterEach(() => {
    window.history.replaceState(null, '', originalUrl)
  })

  it('matches routes when the app is served from a base path', async () => {
    window.history.replaceState(null, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
  })
})
