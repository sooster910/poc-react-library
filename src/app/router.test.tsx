import '@testing-library/jest-dom/vitest'

import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter } from '@/app/router'

describe('app router', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/')
  })

  it('matches and generates links when the app is deployed under a basename', async () => {
    window.history.pushState(null, '', '/poc-react-library/')

    render(<RouterProvider router={createAppRouter({ basename: '/poc-react-library/' })} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '레이스 컨디션 데모 열기' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )
  })
})
