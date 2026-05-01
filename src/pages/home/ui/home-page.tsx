import { Link } from 'react-router-dom'

const starterNotes = [
  'Biome만으로 포맷과 린트를 관리합니다.',
  '학습용 예제는 별도 라우트에서 실험할 수 있게 분리했습니다.',
  'TanStack Query와 Suspense 예제는 실제 race condition을 재현합니다.',
]

export function HomePage() {
  return (
    <section className="mt-5 grid gap-5 md:grid-cols-2">
      <article className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(242,123,74,0.08),transparent_40%),var(--color-surface-strong)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          Start here
        </p>
        <h2 className="m-0 leading-[1.14]">프론트엔드 학습과 실험을 위한 기본 프로젝트</h2>
        <p className="mt-3.5 text-stone-300">
          홈은 프로젝트 개요만 보여주고, 실습형 예제는 별도 학습 라우트로 분리했습니다.
        </p>
        <ul className="m-0 mt-5 grid list-none gap-3.5 p-0">
          {starterNotes.map((item) => (
            <li
              key={item}
              className="relative pl-6 text-stone-100 before:absolute before:left-0 before:top-[0.5em] before:h-2.5 before:w-2.5 before:rounded-full before:bg-orange-400 before:shadow-[0_0_0_6px_rgba(242,123,74,0.12)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-3xl border border-white/12 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          Learning route
        </p>
        <h2 className="m-0 leading-[1.14]">/learning/race-condition</h2>
        <p className="mt-3.5 text-stone-300">
          <code>useEffect</code> 기반 비동기 처리에서 왜 경합 조건이 생기는지, 그리고{' '}
          <code>useSuspenseQuery</code>가 이를 어떻게 줄이는지 직접 비교할 수 있습니다.
        </p>
        <Link
          className="mt-[18px] inline-flex w-fit rounded-[14px] bg-orange-500/16 px-4 py-3 font-bold text-orange-100 transition-colors hover:bg-orange-500/24"
          to="/learning/race-condition"
        >
          레이스 컨디션 데모 열기
        </Link>

        <div className="mt-4">
          <Link
            className="inline-flex w-fit rounded-[14px] bg-sky-500/14 px-4 py-3 font-bold text-sky-100 transition-colors hover:bg-sky-500/22"
            to="/learning/useQuery-lifecycle"
          >
            useQuery lifecycle 페이지 열기
          </Link>
        </div>
      </article>
    </section>
  )
}
