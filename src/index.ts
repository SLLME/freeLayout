import type { App, Plugin } from 'vue'
import FreeLayoutComponent from './components/FreeLayout.vue'
import './styles/layout.css'

/**
 * The component, with `install()` attached so it also works with
 * `app.use(FreeLayout)`.
 */
export const FreeLayout = Object.assign(FreeLayoutComponent, {
  install(app: App) {
    app.component('FreeLayout', FreeLayoutComponent)
  },
})

export { useLayout, LAYOUT_KEY } from './composables/useLayout'
export type { LayoutContext } from './composables/useLayout'
export { useBreakpoint } from './composables/useBreakpoint'
export { useTheme } from './composables/useTheme'

export * from './types'
export {
  defaultHeaderOptions,
  defaultSidebarOptions,
  defaultFooterOptions,
  defaultContentOptions,
} from './defaults'

/** Explicit plugin object, for `app.use(FreeLayoutPlugin)`. */
export const FreeLayoutPlugin: Plugin = {
  install(app: App) {
    app.component('FreeLayout', FreeLayoutComponent)
  },
}

export default FreeLayout
