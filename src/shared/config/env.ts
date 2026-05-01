interface AppEnv {
  appTitle: string
}

function readString(value: string | undefined, fallback: string) {
  return value?.trim() ? value : fallback
}

export const env: AppEnv = {
  appTitle: readString(import.meta.env.VITE_APP_TITLE, 'Modern Frontend Starter'),
}
