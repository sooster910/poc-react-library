type MockFetch<T> = {
  resolveFn: () => T
  rejectFn: () => unknown
  delayMs: number
}

export async function mockFetch<T>({ resolveFn, rejectFn, delayMs }: MockFetch<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(resolveFn())
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(error)
        } else {
          reject(new Error('Failed to fetch user'))
        }
        reject(rejectFn())
      }
    }, delayMs)

    // clearTimeout(timeoutId)
  })
}
