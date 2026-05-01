# TanStack Query `queryKey` 관리 베스트 프랙티스

이 문서는 이 레포에서 **queryKey를 “정의/재사용/변경”**할 때의 규칙을 정리합니다.

## 목표

- **일관성**: 어디서든 같은 key를 쓰고, 한 곳에서만 정의한다.
- **안전한 무효화(invalidate)**: 특정 화면/피처만 정확히 갱신한다.
- **확장성**: 필터/정렬/페이지네이션이 늘어나도 key가 깨지지 않는다.
- **디버깅 용이성**: Devtools에서 key를 보면 의미를 알 수 있다.

## 핵심 규칙

### 1) queryKey는 “문자열 배열”이 아니라 “도메인 식별자”다

- key는 캐시의 주소입니다. 따라서 **도메인/리소스/파라미터**를 정확히 표현해야 합니다.
- **권장 형태**
  - `[feature, resource, scope, params]`
  - 예: `['catalog', 'products', { categoryId: 'hats' }]`

### 2) key는 “상수/팩토리”로만 만들고, 화면에서 즉석 생성 금지

화면/컴포넌트에서 아래 같은 코드를 금지합니다.

```ts
// ❌ 금지: 화면에서 즉석 key 생성
useQuery({ queryKey: ['products', categoryId], ... })
```

대신 “한 파일”에서 키를 정의하고, 사용처는 그것만 import 합니다.

```ts
// ✅ 권장: 중앙 정의 + 재사용
useQuery({ queryKey: catalogKeys.productsByCategory(categoryId), ... })
```

### 3) key의 prefix 계층을 설계해서 “부분 무효화”가 가능해야 한다

- 전체 카탈로그 리프레시: `invalidateQueries({ queryKey: catalogKeys.all })`
- 상품만 리프레시: `invalidateQueries({ queryKey: catalogKeys.products() })`
- 특정 카테고리만 리프레시: `invalidateQueries({ queryKey: catalogKeys.productsByCategory(categoryId) })`

### 4) 파라미터는 “객체 1개”로 묶어 마지막에 둔다

```ts
// ✅ 권장 (확장에 강함)
['catalog', 'products', 'list', { categoryId, sort, page }]
```

이렇게 하면 필드가 늘어도 순서 문제로 key가 깨지는 일이 줄어듭니다.

### 5) key에 “직렬화 불가능한 값”을 넣지 않는다

- ❌ 넣지 말 것: 함수, class instance, DOM node, Map/Set, Date(의도 없이)
- ✅ 넣어도 되는 것: string/number/boolean/null, plain object, plain array

> Date가 필요하면 `toISOString()` 같은 **문자열**로 넣는 편이 안전합니다.

### 6) key 스코프를 명확히: feature 단위 prefix를 고정한다

이 레포 기준으로 feature 폴더가 존재하므로, key prefix는 feature에 맞춰 잡습니다.

- `race-condition` 데모라면 예: `['raceCondition', ...]`
- 카탈로그라면 예: `['catalog', ...]`

### 7) queryFn이 받는 파라미터와 queryKey 파라미터를 “동일 모델”로 맞춘다

key에 `{ categoryId }`를 넣었다면 queryFn도 `{ categoryId }`를 기준으로 동작해야 합니다.
중복 소스(예: props/전역/클로저에서 별도 categoryId 참조)가 생기면, invalidate/refresh가 꼬이기 쉽습니다.

## 이 레포 권장 템플릿

아래 패턴으로 각 feature의 `model/query-keys.ts`(또는 `lib/query-keys.ts`)에 둡니다.

```ts
export const catalogKeys = {
  all: ['catalog'] as const,

  products: () => [...catalogKeys.all, 'products'] as const,

  productsList: () => [...catalogKeys.products(), 'list'] as const,

  productsByCategory: (categoryId: string) =>
    [...catalogKeys.productsList(), { categoryId }] as const,
}
```

사용 예시:

```ts
useQuery({
  queryKey: catalogKeys.productsByCategory(categoryId),
  queryFn: ({ signal }) => getProductsByCategory(categoryId, { signal }),
})
```

## 흔한 실수 체크리스트

- **키 네이밍이 바뀌었는데 invalidate는 옛날 prefix를 쓰는 경우**
- **배열 순서로 파라미터를 넣다가(sort/page 추가) 기존 캐시가 의도치 않게 분리되는 경우**
- **number/string 타입 혼용(예: `'1'` vs `1`)으로 캐시가 중복되는 경우**
- **key가 화면마다 제각각이라 같은 데이터가 중복 패칭되는 경우**

