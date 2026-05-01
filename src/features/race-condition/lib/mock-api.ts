import {
  type CategoryId,
  categories,
  type ProductCard,
  productsByCategory,
} from '@/features/race-condition/model/catalog'

interface QueryOptions {
  signal?: AbortSignal
}

function wait(delayMs: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      resolve()
    }, delayMs)

    if (!signal) {
      return
    }

    const abort = () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException('The request was aborted.', 'AbortError'))
    }

    if (signal.aborted) {
      abort()
      return
    }

    signal.addEventListener('abort', abort, { once: true })
  })
}

export function getCategoryInfo(categoryId: CategoryId) {
  const category = categories.find((entry) => entry.id === categoryId)

  if (!category) {
    // Error Boundary에서 처리할 수 있도록 명시적으로 실패시킨다.
    throw new Error(`Unknown category: ${categoryId}`)
  }

  return category
}

export async function getProductsByCategory(
  categoryId: CategoryId,
  options: QueryOptions = {},
): Promise<ProductCard[]> {
  const category = getCategoryInfo(categoryId)

  await wait(category.delayMs, options.signal)

  return productsByCategory[categoryId]
}
