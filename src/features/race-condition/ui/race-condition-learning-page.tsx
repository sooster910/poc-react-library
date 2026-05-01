import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, useEffect, useEffectEvent, useState } from 'react'

import { getProductsByCategory } from '@/features/race-condition/lib/mock-api'
import {
  type CategoryId,
  categories,
  type ProductCard,
} from '@/features/race-condition/model/catalog'
import { raceConditionKeys } from '@/features/race-condition/model/query-keys'

const imperativeCode = `useEffect(() => {
  const fetchProducts = async () => {
    const data = await getProductsByCategory(categoryId)
    setProducts(data)
  }

  fetchProducts()
}, [categoryId])`

const queryCode = `const { data: products } = useSuspenseQuery({
  queryKey: raceConditionKeys.productsByCategory(categoryId),
  queryFn: ({ signal }) =>
    getProductsByCategory(categoryId, { signal }),
})`

const suspenseCode = `<Suspense fallback={<ProductSkeleton />}>
  <ProductList categoryId={categoryId} />
</Suspense>`

interface ActivityEntry {
  id: string
  text: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

function sleep(delayMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs)
  })
}

function CategoryTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: CategoryId
  onChange: (categoryId: CategoryId) => void
}) {
  return (
    <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={cx(
            'grid gap-1.5 rounded-[18px] border border-white/8 bg-white/3 px-4 py-4 text-left text-stone-400 transition duration-150 hover:-translate-y-0.5 hover:border-white/18',
            activeCategory === category.id && 'border-orange-400/80 bg-orange-500/12',
          )}
          onClick={() => onChange(category.id)}
        >
          <strong className="text-stone-100">{category.label}</strong>
          <span className="text-[0.84rem]">{category.delayMs / 1000}초 응답</span>
        </button>
      ))}
    </div>
  )
}

function getCategoryLabel(categoryId: CategoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? categoryId
}

function ProductCards({ products }: { products: ProductCard[] }) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
      {products.map((product) => (
        <article
          key={product.id}
          className="min-h-[150px] rounded-[20px] border border-white/8 bg-white/3 p-[18px]"
        >
          <h4 className="mb-2.5 text-[1.02rem]">{product.name}</h4>
          <p className="m-0 text-stone-300">{product.blurb}</p>
        </article>
      ))}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{children}</p>
  )
}

function LessonCard({ children, tone }: { children: React.ReactNode; tone: 'danger' | 'safe' }) {
  return (
    <article
      className={cx(
        'min-w-0 grid content-start gap-[18px] rounded-3xl border border-white/12 p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5',
        tone === 'danger'
          ? 'bg-[linear-gradient(180deg,rgba(255,110,110,0.08),transparent_42%),var(--color-surface)]'
          : 'bg-[linear-gradient(180deg,rgba(99,218,168,0.08),transparent_42%),var(--color-surface)]',
      )}
    >
      {children}
    </article>
  )
}

function AvoidRaceCondition() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('clothing')
  const [renderedCategory, setRenderedCategory] = useState<CategoryId>('clothing')
  const [products, setProducts] = useState<ProductCard[]>([])
  useEffect(() => {
    getProductsByCategory(activeCategory).then((nextProducts) => {
      setProducts(nextProducts)
      setRenderedCategory(activeCategory)
    })
  }, [activeCategory])
  function handleAvoidRaceCondition() {
    setActiveCategory('clothing')
    getProductsByCategory(activeCategory).then((nextProducts) => {
      setProducts(nextProducts)
      setRenderedCategory(activeCategory)
    })
  }
  return (
    <LessonCard tone="safe">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <SectionLabel>2. useEffect에서 Race Condition방지</SectionLabel>
          <h3 className="m-0 leading-[1.12] tracking-[-0.04em]">
            취소와 정합성 체크를 직접 구현해야만 경합 조건을 막을 수 있습니다
          </h3>
        </div>
        <span className="inline-flex max-w-full rounded-full bg-emerald-400/16 px-3 py-2 text-[0.83rem] font-bold text-emerald-100">
          Race Condition을 방지해보자 useEffect에서
        </span>
      </div>
      <p className="m-0 text-stone-300">
        AbortController, 최신 요청 id 비교, cleanup 처리 같은 방어 로직을 직접 넣어야 안전해집니다.
        이런 수동 제어 비용이 커질수록 선언형 데이터 패칭 도구의 가치가 커집니다.
      </p>

      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      <div className="flex min-w-0 flex-wrap items-center gap-x-3.5 gap-y-2.5">
        <button
          type="button"
          className="rounded-[14px] bg-gradient-to-br from-orange-400 to-orange-300 px-4 py-3 font-extrabold text-[#2f1307] disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleAvoidRaceCondition}
        >
          의류 → 신발 → 모자 빠르게 재현
        </button>
        <span className="min-w-0 break-words text-[0.92rem] text-stone-400">
          현재 선택: {getCategoryLabel(activeCategory)}
        </span>
        <span className="min-w-0 break-words text-[0.92rem] text-stone-400">
          실제 렌더링: {getCategoryLabel(renderedCategory)}
        </span>
      </div>

      {products.length > 0 ? <ProductCards products={products} /> : <DemoSkeleton />}
    </LessonCard>
  )
}

function ImperativeRaceDemo() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('clothing')
  const [renderedCategory, setRenderedCategory] = useState<CategoryId>('clothing')
  const [products, setProducts] = useState<ProductCard[]>([])
  const [activity, setActivity] = useState<ActivityEntry[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const appendActivity = useEffectEvent((text: string) => {
    setActivity((current) =>
      [
        {
          id: crypto.randomUUID(),
          text,
        },
        ...current,
      ].slice(0, 8),
    )
  })

  useEffect(() => {
    appendActivity(`요청 시작: ${getCategoryLabel(activeCategory)}`)

    getProductsByCategory(activeCategory).then((nextProducts) => {
      setProducts(nextProducts)
      setRenderedCategory(activeCategory)
      appendActivity(`응답 도착: ${getCategoryLabel(activeCategory)}`)
    })
  }, [activeCategory])

  async function replayRace() {
    setIsPlaying(true)
    setActivity([])
    setActiveCategory('clothing')
    await sleep(120)
    setActiveCategory('shoes')
    await sleep(120)
    setActiveCategory('hats')
    setIsPlaying(false)
  }

  const mismatch = activeCategory !== renderedCategory

  return (
    <LessonCard tone="danger">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <SectionLabel>1. useEffect 방식</SectionLabel>
          <h3 className="m-0 leading-[1.12] tracking-[-0.04em]">
            늦게 도착한 과거 응답이 최신 화면을 덮어씁니다
          </h3>
        </div>
        <span
          className={cx(
            'inline-flex max-w-full rounded-full px-3 py-2 text-[0.83rem] font-bold',
            mismatch ? 'bg-red-400/16 text-red-100' : 'bg-white/6 text-stone-200',
          )}
        >
          {mismatch ? '레이스 컨디션 발생' : '초기 상태'}
        </span>
      </div>

      <p className="m-0 text-stone-300">
        카테고리를 빠르게 전환한 뒤 마지막으로 모자를 선택해도, 의류 응답이 더 늦게 와서 화면을
        덮어쓸 수 있습니다.
      </p>

      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      <div className="flex min-w-0 flex-wrap items-center gap-x-3.5 gap-y-2.5">
        <button
          type="button"
          className="rounded-[14px] bg-gradient-to-br from-orange-400 to-orange-300 px-4 py-3 font-extrabold text-[#2f1307] disabled:cursor-not-allowed disabled:opacity-70"
          onClick={replayRace}
          disabled={isPlaying}
        >
          의류 → 신발 → 모자 빠르게 재현
        </button>
        <span className="min-w-0 break-words text-[0.92rem] text-stone-400">
          현재 선택: {getCategoryLabel(activeCategory)}
        </span>
        <span className="min-w-0 break-words text-[0.92rem] text-stone-400">
          실제 렌더링: {getCategoryLabel(renderedCategory)}
        </span>
      </div>

      {products.length > 0 ? <ProductCards products={products} /> : <DemoSkeleton />}

      <div className="grid gap-2">
        {activity.map((entry) => (
          <div
            key={entry.id}
            className="border-l-2 border-white/16 bg-white/2 px-3 py-2.5 text-[0.92rem] text-stone-400"
          >
            {entry.text}
          </div>
        ))}
      </div>

      <CodeBlock title="취약한 명령형 코드" code={imperativeCode} />
    </LessonCard>
  )
}

function SuspenseQueryResult({ activeCategory }: { activeCategory: CategoryId }) {
  const { data } = useSuspenseQuery({
    queryKey: raceConditionKeys.productsByCategory(activeCategory),
    queryFn: ({ signal }) => getProductsByCategory(activeCategory, { signal }),
  })

  return <ProductCards products={data} />
}

function QueryRaceDemo() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('clothing')
  const [isPlaying, setIsPlaying] = useState(false)

  async function replayRace() {
    setIsPlaying(true)
    setActiveCategory('clothing')
    await sleep(120)
    setActiveCategory('shoes')
    await sleep(120)
    setActiveCategory('hats')
    setIsPlaying(false)
  }

  return (
    <LessonCard tone="safe">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <SectionLabel>2. useSuspenseQuery 방식</SectionLabel>
          <h3 className="m-0 leading-[1.12] tracking-[-0.04em]">
            최신 쿼리 키만 렌더링되고 이전 요청은 무시되거나 취소됩니다
          </h3>
        </div>
        <span className="inline-flex max-w-full rounded-full bg-emerald-400/16 px-3 py-2 text-[0.83rem] font-bold text-emerald-100">
          선언적으로 해결
        </span>
      </div>

      <p className="m-0 text-stone-300">
        선택된 카테고리는 쿼리 키로 추적되고, 새로운 키로 바뀌면 렌더링은 안전한 fallback으로 잠시
        전환됩니다.
      </p>

      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      <div className="flex min-w-0 flex-wrap items-center gap-x-3.5 gap-y-2.5">
        <button
          type="button"
          className="rounded-[14px] bg-gradient-to-br from-emerald-300 to-emerald-200 px-4 py-3 font-extrabold text-[#083121] disabled:cursor-not-allowed disabled:opacity-70"
          onClick={replayRace}
          disabled={isPlaying}
        >
          같은 시나리오 다시 보기
        </button>
        <span className="min-w-0 break-words text-[0.92rem] text-stone-400">
          {`현재 쿼리 키: ['products', '${getCategoryLabel(activeCategory)}']`}
        </span>
      </div>

      <Suspense fallback={<DemoSkeleton />}>
        <SuspenseQueryResult activeCategory={activeCategory} />
      </Suspense>

      <CodeBlock title="쿼리 키 기반 선언형 코드" code={queryCode} />
      <CodeBlock title="UI 충돌을 막는 Suspense 경계" code={suspenseCode} />
    </LessonCard>
  )
}

function DemoSkeleton() {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="grid min-h-[150px] gap-3 rounded-[20px] border border-white/8 bg-white/3 p-[18px]"
        >
          <div className="h-[18px] w-[70%] rounded-full bg-gradient-to-r from-white/5 to-white/12" />
          <div className="h-3 rounded-full bg-gradient-to-r from-white/5 to-white/12" />
          <div className="h-3 w-[52%] rounded-full bg-gradient-to-r from-white/5 to-white/12" />
        </div>
      ))}
    </div>
  )
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <section className="min-w-0 rounded-[20px] border border-white/8 bg-black/45 p-[18px]">
      <p className="mb-3 text-sm font-bold text-amber-300">{title}</p>
      <pre className="m-0 max-w-full overflow-x-auto">
        <code className="block w-full bg-transparent p-0 leading-[1.7] break-words text-stone-100">
          {code}
        </code>
      </pre>
    </section>
  )
}

const takeaways = [
  'useEffect 기반 데이터 페칭은 응답 도착 순서를 직접 통제해야 합니다.',
  'useSuspenseQuery는 queryKey를 기준으로 현재 화면에 유효한 데이터만 연결합니다.',
  'queryFn에서 AbortSignal을 연결하면 이전 요청을 네트워크 레벨에서 취소할 수 있습니다.',
  'Suspense fallback은 로딩 중에 이전 데이터와 새 데이터가 뒤섞이는 UI 충돌을 줄여 줍니다.',
]

export function RaceConditionLearningPage() {
  return (
    <section className="mt-5 grid gap-5">
      <article className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(242,123,74,0.08),transparent_40%),var(--color-surface-strong)] p-6 shadow-[var(--shadow-panel)] max-[820px]:rounded-[20px] max-[820px]:p-5">
        <SectionLabel>학습 페이지</SectionLabel>
        <h2 className="m-0 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[-0.04em]">
          TanStack Query가 레이스 컨디션을 어떻게 줄이는지 직접 확인해보세요
        </h2>
        <p className="mt-3.5 max-w-[72ch] text-stone-300">
          아래 데모는 동일한 카테고리 전환 시나리오를 두 방식으로 비교합니다. 왼쪽은 과거의 명령형{' '}
          <code>useEffect</code> 패턴이고, 오른쪽은 <code>useSuspenseQuery</code>와{' '}
          <code>Suspense</code>를 이용한 선언형 패턴입니다.
        </p>

        <div className="mt-6 grid gap-3.5 md:grid-cols-2">
          {takeaways.map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-white/8 bg-white/4 p-[18px] text-stone-100"
            >
              {item}
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-5 min-[1040px]:grid-cols-2">
        <ImperativeRaceDemo />
        <AvoidRaceCondition />
        <QueryRaceDemo />
      </div>
    </section>
  )
}
