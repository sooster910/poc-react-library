import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { HomePage } from '@/pages/home/ui/home-page'

describe('HomePage', () => {
  it('renders the learning route entry point', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('프론트엔드 학습과 실험을 위한 기본 프로젝트')).toBeInTheDocument()
    expect(screen.getByText('/learning/race-condition')).toBeInTheDocument()
    expect(screen.getByText('레이스 컨디션 데모 열기')).toBeInTheDocument()
  })
})
