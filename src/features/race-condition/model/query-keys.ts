import type { CategoryId } from '@/features/race-condition/model/catalog'

export const raceConditionKeys = {
  all: ['raceCondition'] as const,
  products: () => [...raceConditionKeys.all, 'products'] as const,
  productsByCategory: (categoryId: CategoryId) =>
    [...raceConditionKeys.products(), { categoryId }] as const,
}
