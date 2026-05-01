export type CategoryId = 'clothing' | 'shoes' | 'hats'

export interface CategoryInfo {
  id: CategoryId
  label: string
  delayMs: number
  description: string
}

export interface ProductCard {
  id: string
  name: string
  blurb: string
}

export const categories: CategoryInfo[] = [
  {
    id: 'clothing',
    label: '의류',
    delayMs: 3000,
    description: '가장 오래 걸리는 응답. 늦게 도착해 최신 화면을 덮어쓸 수 있습니다.',
  },
  {
    id: 'shoes',
    label: '신발',
    delayMs: 2000,
    description: '중간 속도의 응답. 빠르게 연속 클릭하면 순서가 뒤집힐 수 있습니다.',
  },
  {
    id: 'hats',
    label: '모자',
    delayMs: 1000,
    description: '가장 마지막에 선택되지만 가장 먼저 도착하는 응답입니다.',
  },
]

export const productsByCategory: Record<CategoryId, ProductCard[]> = {
  clothing: [
    { id: 'cl-1', name: '런웨이 셔츠', blurb: '얇은 코튼 소재로 봄 시즌 메인 상품.' },
    { id: 'cl-2', name: '모션 재킷', blurb: '출퇴근과 주말 모두 커버하는 경량 아우터.' },
    { id: 'cl-3', name: '와이드 슬랙스', blurb: '편안한 실루엣과 탄탄한 핏을 동시에 제공.' },
  ],
  shoes: [
    { id: 'sh-1', name: '트랙 스니커즈', blurb: '충격 흡수와 쿠셔닝을 강조한 데일리 슈즈.' },
    { id: 'sh-2', name: '레더 로퍼', blurb: '오피스 룩과 캐주얼 룩을 함께 소화하는 모델.' },
    { id: 'sh-3', name: '하이킹 부츠', blurb: '젖은 노면에서도 안정적인 접지력을 유지.' },
  ],
  hats: [
    { id: 'ha-1', name: '아카이브 볼캡', blurb: '짧은 챙과 높은 크라운으로 포인트를 주는 캡.' },
    { id: 'ha-2', name: '패커블 버킷햇', blurb: '휴대성과 통기성이 뛰어난 여름용 아이템.' },
    { id: 'ha-3', name: '울 비니', blurb: '간절기와 겨울 시즌에 활용도 높은 기본형.' },
  ],
}
