<script setup lang="ts">
import { computed, provide, ref, useSlots, watch } from 'vue'
import type { CSSProperties } from 'vue'
import {
  defaultContentOptions,
  defaultFooterOptions,
  defaultHeaderOptions,
  defaultSidebarOptions,
  resolvePartial,
  resolveRegion,
  toCssSize,
} from '../defaults'
import type { FreeLayoutProps, ThemeMode } from '../types'
import { LAYOUT_KEY } from '../composables/useLayout'
import type { LayoutContext } from '../composables/useLayout'
import { useBreakpoint } from '../composables/useBreakpoint'
import { useTheme } from '../composables/useTheme'

/**
 * Explicit `default: undefined` matters here: without it Vue's boolean casting
 * turns an absent `header` / `sidebar` / `footer` prop into `false`, which
 * would hide the region even though the user never asked for it.
 */
const props = withDefaults(defineProps<FreeLayoutProps>(), {
  header: undefined,
  sidebar: undefined,
  footer: undefined,
  content: undefined,
  theme: 'light',
  scrollMode: 'content',
  mobileBreakpoint: 768,
  transition: true,
  collapsed: undefined,
})

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
  (e: 'toggle-sidebar', value: boolean): void
}>()

const slots = useSlots()

/* ------------------------------------------------------------------ *
 * Resolved region options
 * ------------------------------------------------------------------ */

const header = computed(() => resolveRegion(props.header, defaultHeaderOptions))
const sidebar = computed(() => resolveRegion(props.sidebar, defaultSidebarOptions))
const footer = computed(() => resolveRegion(props.footer, defaultFooterOptions))
const content = computed(() => resolvePartial(props.content, defaultContentOptions))

const headerVisible = computed(() => header.value.visible)
const sidebarVisible = computed(() => sidebar.value.visible)
const footerVisible = computed(() => footer.value.visible)

/* ------------------------------------------------------------------ *
 * Responsive / theme
 * ------------------------------------------------------------------ */

const breakpoint = computed(() => props.mobileBreakpoint ?? 768)
const { width: viewportWidth, isMobile } = useBreakpoint(breakpoint)
const mobileOverlay = computed(() => isMobile.value && sidebar.value.overlayOnMobile)

const themeMode = computed<ThemeMode>(() => props.theme ?? 'light')
const theme = useTheme(() => themeMode.value)

/* ------------------------------------------------------------------ *
 * Collapsed state (controlled via v-model:collapsed, uncontrolled otherwise)
 * ------------------------------------------------------------------ */

const internalCollapsed = ref(resolveRegion(props.sidebar, defaultSidebarOptions).defaultCollapsed)
let desktopCollapsed = internalCollapsed.value

const collapsed = computed<boolean>({
  get: () => (props.collapsed === undefined ? internalCollapsed.value : props.collapsed),
  set: (value) => {
    if (props.collapsed === undefined) internalCollapsed.value = value
    emit('update:collapsed', value)
  },
})

// Entering mobile mode closes the drawer, leaving it restores the desktop rail state.
// Works for both controlled (`v-model:collapsed`) and uncontrolled usage.
watch(mobileOverlay, (isOverlay) => {
  if (isOverlay) {
    desktopCollapsed = collapsed.value
    collapsed.value = true
  } else {
    collapsed.value = desktopCollapsed
  }
})

function setCollapsed(value: boolean) {
  collapsed.value = value
}
function toggleSidebar() {
  collapsed.value = !collapsed.value
  emit('toggle-sidebar', collapsed.value)
}
function collapseSidebar() {
  setCollapsed(true)
}
function expandSidebar() {
  setCollapsed(false)
}

/* ------------------------------------------------------------------ *
 * Provide state to descendants
 * ------------------------------------------------------------------ */

const context: LayoutContext = {
  collapsed: computed(() => collapsed.value),
  toggleSidebar,
  setCollapsed,
  collapseSidebar,
  expandSidebar,
  headerVisible,
  sidebarVisible,
  footerVisible,
  isMobile,
  viewportWidth,
  header,
  sidebar,
  footer,
  content,
  theme,
}

provide(LAYOUT_KEY, context)

defineExpose({ toggleSidebar, setCollapsed, collapsed, isMobile })

/* ------------------------------------------------------------------ *
 * Presentation
 * ------------------------------------------------------------------ */

const scrollMode = computed(() => props.scrollMode ?? 'content')
const withTransition = computed(() => props.transition !== false)

const stickyTop = computed(() => {
  if (scrollMode.value !== 'page') return '0px'
  if (!headerVisible.value || !header.value.sticky || header.value.position !== 'top') return '0px'
  return toCssSize(header.value.height) ?? '0px'
})

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    '--fl-header-height': toCssSize(header.value.height) ?? '56px',
    '--fl-sidebar-width': toCssSize(sidebar.value.width) ?? '240px',
    '--fl-sidebar-collapsed-width': toCssSize(sidebar.value.collapsedWidth) ?? '64px',
    '--fl-footer-height': toCssSize(footer.value.height) ?? '44px',
    '--fl-content-padding': toCssSize(content.value.padding) ?? '20px',
    '--fl-sticky-top': stickyTop.value,
  }
  const maxWidth = toCssSize(content.value.maxWidth)
  if (maxWidth) style['--fl-content-max-width'] = maxWidth
  if (content.value.background) style['--fl-content-bg'] = content.value.background
  if (props.primaryColor) style['--fl-primary'] = props.primaryColor

  // Logo width follows the sidebar by default; `auto` when there is no sidebar.
  const logoWidth = toCssSize(header.value.logoWidth)
  if (logoWidth) style['--fl-logo-width'] = logoWidth
  else if (!sidebarVisible.value) style['--fl-logo-width'] = 'auto'

  return style as CSSProperties
})

const rootClass = computed(() => [
  'fl-layout',
  {
    'is-mobile': isMobile.value,
    'is-overlay': mobileOverlay.value,
    'is-sidebar-right': sidebarVisible.value && sidebar.value.position === 'right',
    'is-collapsed': collapsed.value,
    'is-open': mobileOverlay.value && !collapsed.value,
    'is-transition': withTransition.value,
    'is-header-bottom': headerVisible.value && header.value.position === 'bottom',
    'is-footer-top': footerVisible.value && footer.value.position === 'top',
  },
])

const headerClass = computed(() => ({
  'is-bordered': header.value.bordered,
  'is-sticky': header.value.sticky,
  'is-bottom': header.value.position === 'bottom',
  'is-logo-hidden': !header.value.logoVisible,
}))

const sidebarClass = computed(() => ({
  'is-bordered': sidebar.value.bordered,
  'is-sticky': sidebar.value.sticky,
  'is-collapsed': collapsed.value,
  'is-right': sidebar.value.position === 'right',
}))

const footerClass = computed(() => ({
  'is-bordered': footer.value.bordered,
  'is-sticky': footer.value.sticky,
  [`is-align-${footer.value.align}`]: true,
}))

const headerOrder = computed(() => (header.value.position === 'bottom' ? 2 : 0))
const footerOrder = computed(() => (footer.value.position === 'top' ? 0 : 2))

const hasSidebarFooter = computed(() => Boolean(slots['sidebar-footer']))
const hasFooterSlot = computed(() => Boolean(slots.footer))
</script>

<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    :data-theme="theme"
    :data-scroll="scrollMode"
  >
    <!-- ── Header ─────────────────────────────────────────────── -->
    <header
      v-if="headerVisible"
      class="fl-header"
      :class="headerClass"
      :style="{ order: headerOrder }"
    >
      <div v-if="header.logoVisible" class="fl-header__logo">
        <slot name="logo" :title="title" :collapsed="collapsed" :is-mobile="isMobile">
          <span v-if="logo" class="fl-logo__mark">{{ logo }}</span>
          <span v-if="title" class="fl-logo__text">{{ title }}</span>
        </slot>
      </div>

      <div class="fl-header__main">
        <slot name="header" :collapsed="collapsed" :is-mobile="isMobile">
          <div class="fl-header__left">
            <slot name="header-left" />
          </div>
          <nav class="fl-header__nav">
            <slot name="nav" />
          </nav>
          <div class="fl-header__right">
            <slot name="header-right" />
          </div>
        </slot>
      </div>
    </header>

    <!-- ── Body ───────────────────────────────────────────────── -->
    <div class="fl-body" :style="{ order: 1 }">
      <!-- Sidebar / menu -->
      <aside v-if="sidebarVisible" class="fl-sidebar" :class="sidebarClass">
        <div v-if="sidebar.collapsible" class="fl-sidebar__head">
          <button
            type="button"
            class="fl-toggle"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :aria-expanded="!collapsed"
            @click="toggleSidebar"
          >
            <slot name="toggle" :collapsed="collapsed">
              <svg class="fl-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </slot>
          </button>
        </div>

        <div class="fl-sidebar__menu">
          <slot name="menu" :collapsed="collapsed" :is-mobile="isMobile" />
        </div>

        <div v-if="hasSidebarFooter" class="fl-sidebar__foot">
          <slot name="sidebar-footer" :collapsed="collapsed" />
        </div>
      </aside>

      <button
        v-if="mobileOverlay && collapsed && sidebar.mobileTrigger"
        type="button"
        class="fl-mobile-trigger"
        aria-label="Open menu"
        @click="expandSidebar"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <div v-if="mobileOverlay && !collapsed" class="fl-backdrop" @click="collapseSidebar" />

      <div class="fl-content-col">
        <!-- Content: put your <router-view /> here -->
        <main
          class="fl-content"
          :class="{ 'is-scrollable': content.scrollable, 'is-centered': !!content.maxWidth }"
          :style="{ order: 1 }"
        >
          <div class="fl-content__inner">
            <slot :collapsed="collapsed" />
          </div>
        </main>

        <!-- Footer docked inside the content column (default) -->
        <footer
          v-if="footerVisible && !footer.fullWidth"
          class="fl-footer"
          :class="footerClass"
          :style="{ order: footerOrder }"
        >
          <slot name="footer">
            <span v-if="footer.text">{{ footer.text }}</span>
            <span v-else-if="footer.version || version">v{{ footer.version || version }}</span>
          </slot>
        </footer>
      </div>
    </div>

    <!-- ── Footer spanning the whole shell ─────────────────────── -->
    <footer
      v-if="footerVisible && footer.fullWidth"
      class="fl-footer"
      :class="footerClass"
      :style="{ order: footerOrder }"
    >
      <slot name="footer">
        <span v-if="footer.text">{{ footer.text }}</span>
        <span v-else-if="footer.version || version">v{{ footer.version || version }}</span>
      </slot>
    </footer>
  </div>
</template>
