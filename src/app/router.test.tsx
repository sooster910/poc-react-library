import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter } from '@/app/router'

describe('createAppRouter', () => {
  it('matches the home route when the app is served from a GitHub Pages subpath', () => {
    window.history.pushState({}, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter('/poc-react-library/')} />)

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })
})
