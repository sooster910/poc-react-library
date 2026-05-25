import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { createAppRouter } from '@/app/router'

const pagesBasePath = '/poc-react-library/'

describe('createAppRouter', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/')
  })

  it('matches direct visits and generates links under the configured base path', async () => {
    window.history.pushState(null, '', pagesBasePath)

    const router = createAppRouter(pagesBasePath)

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByText('프론트엔드 학습과 실험을 위한 기본 프로젝트'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Race Condition Lab' })).toHaveAttribute(
      'href',
      '/poc-react-library/learning/race-condition',
    )

    router.dispose()
  })
})
