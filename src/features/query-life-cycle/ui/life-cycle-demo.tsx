import { useState } from 'react'
import { useUserQuery } from '../queries/use-user-query'

export function LifeCycleDemo() {
  const { data, isPending, isFetching, error } = useUserQuery(1)
  const [showUser2Probe, setShowUser2Probe] = useState(true)
  const [showUser3Probe, setShowUser3Probe] = useState(true)

  if (isPending) {
    return (
      <article className="rounded-3xl border border-white/12 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <p className="m-0 text-sm font-bold text-sky-200">⌛ Pending</p>
        <p className="mt-2 text-stone-300">최초 데이터를 가져오는 중입니다.</p>
      </article>
    )
  }

  if (error) {
    return (
      <article className="rounded-3xl border border-red-400/25 bg-[linear-gradient(180deg,rgba(255,110,110,0.10),transparent_42%),var(--color-surface)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <p className="m-0 text-sm font-bold text-red-200">❌ Error</p>
        <p className="mt-2 text-stone-200">{error.message}</p>
      </article>
    )
  }

  return (
    <article className="rounded-3xl border border-white/12 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            Lifecycle Lab
          </p>
          <h3 className="m-0 leading-[1.14]">TanStack Query Lifecycle Lab (Speed Ver.)</h3>
          <p className="mt-2 text-stone-300">2초 뒤에 데이터가 stale 되는 것을 목격하세요.</p>
        </div>
        <span className="inline-flex max-w-full rounded-full bg-sky-500/14 px-3 py-2 text-[0.83rem] font-bold text-sky-100">
          {isFetching ? 'Fetching' : 'Idle'}
        </span>
      </div>

      {isFetching && (
        <p className="mt-4 rounded-[14px] border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-[0.92rem] font-bold text-sky-100">
          🔄 백그라운드에서 데이터를 최신화하고 있습니다... (Fetching)
        </p>
      )}

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-stone-100">
        <p className="m-0 text-[0.95rem] font-bold">
          유저 이름: <span className="text-stone-200">{data.name}</span>
        </p>

        <div className="h-px bg-white/8" />

        <p className="m-0 text-[0.92rem] text-stone-300">
          💡 <strong>Fresh 테스트:</strong> 2초 내에 창을 다시 클릭해보세요. 아무 변화가 없습니다.
        </p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          💡 <strong>Stale 테스트:</strong> 2초 뒤 창을 다시 클릭하면 위의 파란 메시지가 나타납니다.
        </p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          💡 <strong>Inactive 테스트:</strong> gcTime이 지나면 데이터가 소멸됩니다.
        </p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          🧠 <strong>개념 정리:</strong> <code>inactive</code>는 <code>pending/success/error</code>{' '}
          같은 status 값이 아니라, "현재 이 쿼리를 구독 중인 컴포넌트가 없는 상태"를 뜻합니다.
        </p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          🧠 <strong>공식 분류:</strong> TanStack Query는 필터에서{' '}
          <code>active / inactive / all</code>을 공식적으로 제공합니다. 쿼리가 <code>inactive</code>
          가 되는 순간부터 <code>gcTime</code> 카운트가 시작됩니다.
        </p>
      </div>

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-stone-100">
        <p className="m-0 text-[0.95rem] font-bold">queryKey 구분 실험</p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          <code>userKeys.detail(2)</code>와 <code>userKeys.detail(3)</code>는 서로 다른 쿼리입니다.
          각 토글을 껐다 켜며 개별적으로 inactive/active 전환되는지 확인해보세요.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.84rem] font-bold text-stone-100"
            onClick={() => setShowUser2Probe((value) => !value)}
          >
            userId=2 토글 ({showUser2Probe ? 'ON' : 'OFF'})
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.84rem] font-bold text-stone-100"
            onClick={() => setShowUser3Probe((value) => !value)}
          >
            userId=3 토글 ({showUser3Probe ? 'ON' : 'OFF'})
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {showUser2Probe ? <QueryKeyProbeCard userId={2} /> : <InactiveHint userId={2} />}
          {showUser3Probe ? <QueryKeyProbeCard userId={3} /> : <InactiveHint userId={3} />}
        </div>
      </div>
    </article>
  )
}

function QueryKeyProbeCard({ userId }: { userId: number }) {
  const { data, isPending, isFetching } = useUserQuery(userId)

  return (
    <div className="rounded-[14px] border border-white/12 bg-black/20 px-4 py-3 text-[0.9rem] text-stone-200">
      <p className="m-0 font-bold text-sky-200">queryKey: userKeys.detail({userId})</p>
      <p className="mt-1 mb-0">상태: {isPending ? 'Pending' : isFetching ? 'Fetching' : 'Idle'}</p>
      <p className="mt-1 mb-0">데이터: {data ? data.name : '없음'}</p>
    </div>
  )
}

function InactiveHint({ userId }: { userId: number }) {
  return (
    <div className="rounded-[14px] border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-[0.9rem] text-amber-100">
      <p className="m-0 font-bold">userKeys.detail({userId})</p>
      <p className="mt-1 mb-0">현재 구독 컴포넌트가 없어 inactive 상태입니다.</p>
    </div>
  )
}
