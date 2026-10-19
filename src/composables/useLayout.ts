import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject } from 'vue'
import type {
  ResolvedContentOptions,
  ResolvedFooterOptions,
  ResolvedHeaderOptions,
  ResolvedSidebarOptions,
} from '../types'

/**
 * State exposed to every descendant of `<FreeLayout>`.
 * Use it to build your own header buttons, menu items, breadcrumbs, ...
 */
export interface LayoutContext {
  /** Whether the sidebar is collapsed (desktop rail) or closed (mobile drawer). */
  collapsed: ComputedRef<boolean>
  /** Collapse / expand (or open / close the drawer on mobile). */
  toggleSidebar: () => void
  setCollapsed: (value: boolean) => void
  collapseSidebar: () => void
  expandSidebar: () => void

  headerVisible: ComputedRef<boolean>
  sidebarVisible: ComputedRef<boolean>
  footerVisible: ComputedRef<boolean>

  /** `true` when the viewport is narrower than `mobileBreakpoint`. */
  isMobile: ComputedRef<boolean>
  viewportWidth: Ref<number>

  /** Resolved region options, useful to mirror sizes in your own UI. */
  header: ComputedRef<ResolvedHeaderOptions>
  sidebar: ComputedRef<ResolvedSidebarOptions>
  footer: ComputedRef<ResolvedFooterOptions>
  content: ComputedRef<ResolvedContentOptions>

  /** Concrete theme in use — `'auto'` is already resolved to light/dark. */
  theme: ComputedRef<'light' | 'dark'>
}

export const LAYOUT_KEY: InjectionKey<LayoutContext> = Symbol('vue-free-layout')

/**
 * Read the layout state from inside any child of `<FreeLayout>`.
 *
 * @example
 * const { collapsed, toggleSidebar, isMobile } = useLayout()
 */
export function useLayout(): LayoutContext {
  const ctx = inject(LAYOUT_KEY, null)
  if (!ctx) {
    throw new Error('[vue-free-layout] useLayout() must be called inside <FreeLayout>.')
  }
  return ctx
}
