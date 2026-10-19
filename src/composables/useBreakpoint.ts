import type { ComputedRef, Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue'

export interface Breakpoint {
  width: Ref<number>
  isMobile: ComputedRef<boolean>
}

/**
 * Tracks the viewport width (rAF throttled) and derives a boolean flag.
 * SSR safe: falls back to a desktop-ish width until mounted.
 */
export function useBreakpoint(breakpoint: Ref<number> | number, fallback = 1440): Breakpoint {
  const width = ref(fallback)
  let frame = 0

  const read = () => {
    if (typeof window === 'undefined') return
    frame = 0
    width.value = window.innerWidth
  }

  const onResize = () => {
    if (frame) return
    frame = window.requestAnimationFrame(read)
  }

  onMounted(() => {
    read()
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize, { passive: true })
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    if (frame) window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('orientationchange', onResize)
  })

  const isMobile = computed(() => width.value < unref(breakpoint))

  return { width, isMobile }
}
