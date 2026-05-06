import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter } from '@/app/router'

describe('createAppRouter', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/')
  })

  it('renders the app when served from a Vite base path', async () => {
    window.history.pushState(null, '', '/poc-react-library/')

    const router = createAppRouter('/poc-react-library/')
    render(<RouterProvider router={router} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
  })
})
