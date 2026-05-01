import { useState } from 'react'

import { LifeCycleDemo } from '@/features/query-life-cycle/ui/life-cycle-demo'

type SourceSnippet = {
  id: 'status' | 'filter' | 'active' | 'gc'
  title: string
  filePath: string
  githubUrl: string
  summary: string
  code: string
}

const sourceSnippets: SourceSnippet[] = [
  {
    id: 'status',
    title: '상태 축 타입 정의',
    filePath: 'query-core/src/types.ts',
    githubUrl: 'https://github.com/TanStack/query/blob/main/packages/query-core/src/types.ts',
    summary: 'status 축과 fetchStatus 축이 분리되어 타입으로 선언됩니다.',
    code: `export type QueryStatus = 'pending' | 'error' | 'success'
export type FetchStatus = 'fetching' | 'paused' | 'idle'`,
  },
  {
    id: 'filter',
    title: 'active/inactive 공식 필터',
    filePath: 'query-core/src/utils.ts',
    githubUrl: 'https://github.com/TanStack/query/blob/main/packages/query-core/src/utils.ts',
    summary: 'active/inactive는 status가 아니라 QueryFilters의 type 분류입니다.',
    code: `export interface QueryFilters<TQueryKey extends QueryKey = QueryKey> {
  /**
   * Filter to active queries, inactive queries or all queries
   */
  type?: QueryTypeFilter
}

export type QueryTypeFilter = 'all' | 'active' | 'inactive'`,
  },
  {
    id: 'active',
    title: 'active 판정 로직',
    filePath: 'query-core/src/query.ts',
    githubUrl: 'https://github.com/TanStack/query/blob/main/packages/query-core/src/query.ts',
    summary: 'observer(구독자)가 존재하는지로 active 여부를 판단합니다.',
    code: `isActive(): boolean {
  return this.observers.some(
    (observer) =>
      resolveQueryBoolean(observer.options.enabled, this) !== false,
  )
}`,
  },
  {
    id: 'gc',
    title: 'inactive 이후 GC 스케줄링',
    filePath: 'query-core/src/query.ts + removable.ts',
    githubUrl: 'https://github.com/TanStack/query/blob/main/packages/query-core/src/query.ts',
    summary: 'observer가 0이 되면 scheduleGc가 호출되고 gcTime 후 제거를 시도합니다.',
    code: `removeObserver(observer: QueryObserver<any, any, any, any, any>): void {
  if (!this.observers.length) {
    this.scheduleGc()
  }
}

protected scheduleGc(): void {
  this.clearGcTimeout()
  if (isValidTimeout(this.gcTime)) {
    this.#gcTimeout = timeoutManager.setTimeout(() => {
      this.optionalRemove()
    }, this.gcTime)
  }
}`,
  },
]

export function UseQueryLifecyclePage() {
  const [activeTab, setActiveTab] = useState<'lab' | 'concept'>('lab')

  return (
    <section className="mt-5 grid gap-5">
      <article className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(49,176,255,0.10),transparent_40%),var(--color-surface-strong)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">
          학습 페이지
        </p>
        <h2 className="m-0 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[-0.04em]">
          useQuery 라이프사이클 (준비 중)
        </h2>
        <p className="mt-3.5 max-w-[72ch] text-stone-300">
          <code>useQuery</code>의 라이프사이클을 실습과 개념 탭으로 나눠 학습합니다. 먼저 실습으로
          감각을 잡고, 개념 탭에서 내부 상태 축을 정리해보세요.
        </p>
        <div className="mt-6 grid gap-3.5 md:grid-cols-2">
          <div className="rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-stone-100">
            <p className="m-0 text-sm font-bold text-sky-200">isPending</p>
            <p className="mt-2 text-stone-300">
              데이터가 도착하기 전까지의 <code>isPending</code> 상태를 관찰합니다.
            </p>
          </div>
          <div className="rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-stone-100">
            <p className="m-0 text-sm font-bold text-sky-200">isFetching</p>
            <p className="mt-2 text-stone-300">
              캐시가 있는 상태에서 백그라운드로 갱신될 때의 <code>isFetching</code> 상태를
              관찰합니다.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-4 py-2 text-[0.84rem] font-bold transition ${
              activeTab === 'lab'
                ? 'border-sky-300/50 bg-sky-400/18 text-sky-100'
                : 'border-white/15 bg-white/8 text-stone-200 hover:border-white/30'
            }`}
            onClick={() => setActiveTab('lab')}
          >
            실습 탭
          </button>
          <button
            type="button"
            className={`rounded-full border px-4 py-2 text-[0.84rem] font-bold transition ${
              activeTab === 'concept'
                ? 'border-sky-300/50 bg-sky-400/18 text-sky-100'
                : 'border-white/15 bg-white/8 text-stone-200 hover:border-white/30'
            }`}
            onClick={() => setActiveTab('concept')}
          >
            개념 탭
          </button>
        </div>
      </article>
      {activeTab === 'lab' ? <LifeCycleDemo /> : <LifecycleConceptTab />}
    </section>
  )
}

function LifecycleConceptTab() {
  const [activeSnippetId, setActiveSnippetId] = useState<SourceSnippet['id']>('status')
  const activeSnippet =
    sourceSnippets.find((snippet) => snippet.id === activeSnippetId) ?? sourceSnippets[0]

  return (
    <article className="rounded-3xl border border-white/12 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">개념 탭</p>
      <h3 className="m-0 leading-[1.14]">useQuery 상태는 3개의 축으로 본다</h3>
      <p className="mt-2 text-stone-300">
        TanStack Query는 상태를 하나의 enum으로 묶지 않고 서로 다른 성격의 축으로 관리합니다.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-[18px] border border-white/8 bg-white/4 p-[18px]">
          <p className="m-0 text-sm font-bold text-emerald-200">status 축</p>
          <p className="mt-2 m-0 text-[0.92rem] text-stone-300">
            <code>pending | error | success</code>
          </p>
        </div>
        <div className="rounded-[18px] border border-white/8 bg-white/4 p-[18px]">
          <p className="m-0 text-sm font-bold text-emerald-200">fetchStatus 축</p>
          <p className="mt-2 m-0 text-[0.92rem] text-stone-300">
            <code>fetching | paused | idle</code>
          </p>
        </div>
        <div className="rounded-[18px] border border-white/8 bg-white/4 p-[18px]">
          <p className="m-0 text-sm font-bold text-emerald-200">observer 축</p>
          <p className="mt-2 m-0 text-[0.92rem] text-stone-300">
            <code>active | inactive</code> (필터 분류)
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-white/4 p-[18px]">
        <p className="m-0 text-[0.95rem] font-bold text-stone-100">inactive 와 gcTime 관계</p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          <strong>inactive는 즉시 삭제가 아닙니다.</strong> 해당 queryKey를 구독하는 컴포넌트가
          0개가 되는 순간 inactive가 되고, 그 시점부터 <code>gcTime</code> 타이머가 시작됩니다.
        </p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          같은 queryKey를 다시 구독하면 타이머는 취소되고 캐시를 재사용합니다. 타이머가 끝날 때까지
          구독자가 없으면 캐시에서 제거됩니다.
        </p>
      </div>

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-black/15 p-[18px]">
        <p className="m-0 text-[0.95rem] font-bold text-stone-100">상태 도식화</p>
        <p className="m-0 text-[0.92rem] text-stone-300">
          아래 도식은 실제 체감 흐름을 단순화한 학습용 지도입니다. 핵심은 세 축이 독립이라는
          점입니다.
        </p>

        <div className="grid gap-2 rounded-[14px] border border-white/10 bg-black/25 p-3">
          <p className="m-0 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-sky-200">
            lifecycle flow
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[0.82rem]">
            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 font-bold text-stone-100">
              mount
            </span>
            <span className="text-stone-400">{'->'}</span>
            <span className="rounded-full border border-sky-300/35 bg-sky-500/15 px-3 py-1 font-bold text-sky-100">
              active + pending + fetching
            </span>
            <span className="text-stone-400">{'->'}</span>
            <span className="rounded-full border border-emerald-300/35 bg-emerald-500/15 px-3 py-1 font-bold text-emerald-100">
              active + success + idle
            </span>
            <span className="text-stone-400">{'->'}</span>
            <span className="rounded-full border border-amber-300/35 bg-amber-500/15 px-3 py-1 font-bold text-amber-100">
              stale (여전히 active 가능)
            </span>
            <span className="text-stone-400">{'->'}</span>
            <span className="rounded-full border border-rose-300/35 bg-rose-500/15 px-3 py-1 font-bold text-rose-100">
              inactive
            </span>
            <span className="text-stone-400">{'->'}</span>
            <span className="rounded-full border border-violet-300/35 bg-violet-500/15 px-3 py-1 font-bold text-violet-100">
              gcTime 만료 시 remove
            </span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[14px] border border-white/10 bg-white/4 p-3">
            <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-emerald-200">
              axis 1: status
            </p>
            <p className="mt-2 m-0 text-[0.9rem] text-stone-300">
              <code>pending | success | error</code>
            </p>
          </div>
          <div className="rounded-[14px] border border-white/10 bg-white/4 p-3">
            <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-emerald-200">
              axis 2: fetchStatus
            </p>
            <p className="mt-2 m-0 text-[0.9rem] text-stone-300">
              <code>fetching | paused | idle</code>
            </p>
          </div>
          <div className="rounded-[14px] border border-white/10 bg-white/4 p-3">
            <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-emerald-200">
              axis 3: observer
            </p>
            <p className="mt-2 m-0 text-[0.9rem] text-stone-300">
              <code>active | inactive</code>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-[0.92rem] text-stone-300">
        <p className="m-0 font-bold text-stone-100">읽는 순서 추천</p>
        <p className="m-0">1) 실습 탭에서 userId=2/3 토글로 active/inactive 변화를 먼저 체감</p>
        <p className="m-0">2) 개념 탭으로 돌아와 3축을 다시 정리</p>
        <p className="m-0">
          3) <code>stale</code>은 신선도 축이고 <code>active/inactive</code>는 구독 축이라는 점을
          분리해서 이해
        </p>
      </div>

      <div className="mt-5 grid gap-3 rounded-[18px] border border-white/8 bg-black/15 p-[18px] text-[0.92rem] text-stone-300">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="m-0 text-[0.95rem] font-bold text-stone-100">오픈소스 코드 연결 보기</p>
          <a
            href="https://github.com/TanStack/query"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[0.78rem] font-bold text-stone-100 transition hover:border-white/35"
          >
            <GitHubIcon />
            TanStack/query
          </a>
        </div>
        <p className="m-0">
          아래 스니펫은 TanStack Query <code>query-core</code>의 실제 코드 구조를 학습용으로 가져온
          것입니다.
        </p>

        <div className="flex flex-wrap gap-2">
          {sourceSnippets.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              className={`rounded-full border px-3 py-1.5 text-[0.8rem] font-bold transition ${
                activeSnippetId === snippet.id
                  ? 'border-emerald-300/60 bg-emerald-400/18 text-emerald-100'
                  : 'border-white/15 bg-white/8 text-stone-200 hover:border-white/30'
              }`}
              onClick={() => setActiveSnippetId(snippet.id)}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        <div className="grid gap-2 rounded-[14px] border border-white/10 bg-black/25 p-3">
          <a
            href={activeSnippet.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-300/35 bg-emerald-500/12 px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-emerald-100 transition hover:border-emerald-300/60"
          >
            <GitHubIcon />
            {activeSnippet.filePath}
          </a>
          <p className="m-0 text-stone-300">{activeSnippet.summary}</p>
          <pre className="m-0 overflow-x-auto rounded-[12px] border border-white/10 bg-[#101418] p-3 text-[0.82rem] text-emerald-100">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        <div className="grid gap-1.5 text-stone-300">
          <p className="m-0 font-bold text-stone-100">코드 흐름 연결</p>
          <p className="m-0">
            1) <code>상태 축 타입 정의</code> {'->'} status/fetchStatus가 서로 별도 축임을 확인
          </p>
          <p className="m-0">
            2) <code>active/inactive 공식 필터</code> {'->'} observer 축이 별도 개념임을 확인
          </p>
          <p className="m-0">
            3) <code>active 판정 로직</code> {'->'} observer 유무로 active가 결정됨을 확인
          </p>
          <p className="m-0">
            4) <code>inactive 이후 GC 스케줄링</code> {'->'} observer 0 이후 gcTime 타이머 확인
          </p>
        </div>
      </div>
    </article>
  )
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.43 7.88 10.96.57.1.78-.24.78-.54 0-.27-.01-.98-.01-1.92-3.2.7-3.88-1.55-3.88-1.55-.52-1.33-1.27-1.69-1.27-1.69-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.67 1.25 3.32.95.1-.74.4-1.25.73-1.54-2.56-.3-5.25-1.29-5.25-5.73 0-1.26.45-2.29 1.18-3.09-.12-.3-.51-1.52.11-3.16 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.64.23 2.86.11 3.16.74.8 1.18 1.83 1.18 3.09 0 4.45-2.69 5.43-5.26 5.72.41.36.77 1.08.77 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.65.79.54A11.54 11.54 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  )
}
