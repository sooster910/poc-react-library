import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, fireEvent, render, screen, within } from '@testing-library/react'

import { RaceConditionLearningPage } from './race-condition-learning-page'

describe('RaceConditionLearningPage', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('ignores an older response after the selected category changes', async () => {
    vi.useFakeTimers()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <RaceConditionLearningPage />
      </QueryClientProvider>,
    )

    const safeHeading = screen.getByRole('heading', {
      name: '취소와 정합성 체크를 직접 구현해야만 경합 조건을 막을 수 있습니다',
    })
    const safeCard = safeHeading.closest('article')

    if (!safeCard) {
      throw new Error('Safe race-condition demo card was not rendered')
    }

    fireEvent.click(within(safeCard).getByRole('button', { name: /^모자/ }))

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    expect(within(safeCard).getByText('실제 렌더링: 모자')).toBeInTheDocument()
    expect(within(safeCard).getByText('아카이브 볼캡')).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })

    expect(within(safeCard).getByText('실제 렌더링: 모자')).toBeInTheDocument()
    expect(within(safeCard).queryByText('런웨이 셔츠')).not.toBeInTheDocument()

    queryClient.clear()
  })
})
