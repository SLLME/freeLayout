import type { ComputedRef } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ThemeMode } from '../types'

/**
 * Resolves `'auto'` against `prefers-color-scheme`.
 */
export function useTheme(mode: () => ThemeMode): ComputedRef<'light' | 'dark'> {
  const prefersDark = ref(false)
  let query: MediaQueryList | null = null

  const onChange = (event: MediaQueryListEvent) => {
    prefersDark.value = event.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    query = window.matchMedia('(prefers-color-scheme: dark)')
    prefersDark.value = query.matches
    query.addEventListener('change', onChange)
  })

  onBeforeUnmount(() => {
    query?.removeEventListener('change', onChange)
    query = null
  })

  return computed<'light' | 'dark'>(() => {
    const value = mode()
    if (value === 'dark') return 'dark'
    if (value === 'light') return 'light'
    return prefersDark.value ? 'dark' : 'light'
  })
}
