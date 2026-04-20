import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = ref<Theme>((localStorage.getItem(STORAGE_KEY) as Theme) || 'light')

  const apply = (t: Theme) => {
    theme.value = t
    localStorage.setItem(STORAGE_KEY, t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  // apply initial
  apply(theme.value)

  const toggle = () => {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  // keep DOM in sync (in case theme changes programmatically)
  watch(theme, apply)

  return { theme, toggle }
}