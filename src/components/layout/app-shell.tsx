import { NavLink, Outlet } from 'react-router-dom'

import { env } from '@/shared/config/env'

function navLinkClass(isActive: boolean) {
  return [
    'rounded-full border px-3.5 py-2 text-sm font-bold transition-colors',
    isActive
      ? 'border-orange-400/50 bg-orange-500/12 text-stone-100'
      : 'border-white/8 bg-white/4 text-stone-400 hover:border-white/18 hover:text-stone-200',
  ].join(' ')
}

export function AppShell() {
  return (
    <div className="mx-auto min-h-screen w-[min(1120px,calc(100vw-32px))] px-0 pb-16 pt-12 max-[820px]:w-[min(1120px,calc(100vw-20px))] max-[820px]:pt-5">
      <nav className="mb-3.5 flex flex-wrap gap-2.5">
        <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)} end>
          Home
        </NavLink>
        <NavLink to="/learning/race-condition" className={({ isActive }) => navLinkClass(isActive)}>
          Race Condition Lab
        </NavLink>
        <NavLink
          to="/learning/useQuery-lifecycle"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          useQuery Lifecycle
        </NavLink>
      </nav>

      <header className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%),var(--color-surface)] p-8 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <div className="pointer-events-none absolute -bottom-[120px] -right-20 h-[280px] w-[280px] rounded-full bg-orange-400/16 blur-[18px]" />
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          React 19 + Vite 8 + TypeScript 5
        </p>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div>
            <h1 className="m-0 text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.94] tracking-[-0.06em]">
              {env.appTitle}
            </h1>
            <p className="mt-4 max-w-[58ch] text-[1.04rem] text-stone-300">
              실무형 프론트엔드 스타터 위에, 직접 눌러보며 이해하는 학습용 라우트를 분리해
              구성했습니다.
            </p>
          </div>

          <div className="self-end rounded-[22px] border border-amber-200/18 bg-white/3 p-5 backdrop-blur-[10px]">
            <span className="mb-3.5 inline-flex rounded-full bg-orange-500/18 px-2.5 py-1.5 text-[0.78rem] font-bold text-orange-100">
              Learning by doing
            </span>
            <p className="m-0 max-w-[58ch] text-[1.04rem] text-stone-300">
              홈은 프로젝트 안내에 집중하고, <code>/learning/race-condition</code>은 비동기 경합
              조건을 체험하는 데모에 집중하도록 나눴습니다.
            </p>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
