import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter } from '@/app/router'

describe('createAppRouter', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renders the index route when served from a non-root base path', async () => {
    window.history.replaceState(null, '', '/poc-react-library/')

    const router = createAppRouter('/poc-react-library/')

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
  })
})
