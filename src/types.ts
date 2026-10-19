/**
 * Public types of vue-free-layout.
 *
 * Every region (header / sidebar / footer / content) is described by an options
 * object. On the component you can pass either a boolean shorthand
 * (`:header="false"`) or a partial object (`:sidebar="{ width: 280 }"`).
 */

export type SizeValue = number | string

/** Which side the sidebar is docked to. */
export type SidebarPosition = 'left' | 'right'

/** Which edge the header / footer is docked to. */
export type EdgePosition = 'top' | 'bottom'

export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * - `content`: the shell fills the viewport and only the content area scrolls (default).
 * - `page`: the shell grows with its content and the whole page scrolls.
 */
export type ScrollMode = 'content' | 'page'

export type FooterAlign = 'left' | 'center' | 'right'

export interface HeaderOptions {
  /** Show the header. Default `true`. */
  visible: boolean
  /** Header height. Default `56`. */
  height: SizeValue
  /** Dock the header to the top or bottom edge. Default `'top'`. */
  position: EdgePosition
  /** Keep the header visible while scrolling (page scroll mode). Default `true`. */
  sticky: boolean
  /** Draw a separating border. Default `true`. */
  bordered: boolean
  /** Show the logo region. Default `true`. */
  logoVisible: boolean
  /**
   * Width of the logo region. Defaults to the sidebar width so that the logo
   * lines up with the menu; `'auto'` lets it shrink-wrap its content.
   */
  logoWidth?: SizeValue
}

export interface SidebarOptions {
  /** Show the sidebar. Default `true`. */
  visible: boolean
  /** Expanded width. Default `240`. */
  width: SizeValue
  /** Width when collapsed (icon-only rail). Default `64`. */
  collapsedWidth: SizeValue
  /** Dock the sidebar to the left or right side. Default `'left'`. */
  position: SidebarPosition
  /** Show the built-in collapse button. Default `true`. */
  collapsible: boolean
  /** Start collapsed. Default `false`. */
  defaultCollapsed: boolean
  /** Keep the sidebar visible while scrolling (page scroll mode). Default `true`. */
  sticky: boolean
  /** Draw a separating border. Default `true`. */
  bordered: boolean
  /**
   * Below `mobileBreakpoint` the sidebar turns into an overlay drawer.
   * Default `true`.
   */
  overlayOnMobile: boolean
  /**
   * Render a floating trigger on mobile while the drawer is closed.
   * Default `false` — usually your header owns that button via `useLayout()`.
   */
  mobileTrigger: boolean
}

export interface FooterOptions {
  /** Show the footer. Default `true`. */
  visible: boolean
  /** Footer height. Default `44`. */
  height: SizeValue
  /** Dock the footer to the bottom or top edge. Default `'bottom'`. */
  position: EdgePosition
  /** Keep the footer visible while scrolling (page scroll mode). Default `false`. */
  sticky: boolean
  /** Draw a separating border. Default `true`. */
  bordered: boolean
  /** Horizontal alignment of the footer content. Default `'center'`. */
  align: FooterAlign
  /**
   * `true` spans the footer across the whole shell (under the sidebar);
   * `false` (default) keeps it inside the content column, as in the sketch.
   */
  fullWidth: boolean
  /** Convenience: renders `v0.1.0` when no `footer` slot is provided. */
  version?: string
  /** Convenience: plain text shown when no `footer` slot is provided. */
  text?: string
}

export interface ContentOptions {
  /** Padding around the content area. Default `20`. */
  padding: SizeValue
  /** Max width of the content column, centered. `undefined` means full width. */
  maxWidth?: SizeValue
  /** Allow the content area to scroll. Default `true`. */
  scrollable: boolean
  /** Background of the content area. Default `transparent`. */
  background?: string
}

export interface ResolvedHeaderOptions extends HeaderOptions {}
export interface ResolvedSidebarOptions extends SidebarOptions {}
export interface ResolvedFooterOptions extends FooterOptions {}
export interface ResolvedContentOptions extends ContentOptions {}

/** Component props (all optional). */
export interface FreeLayoutProps {
  /** `false` hides it, an object configures it. */
  header?: boolean | Partial<HeaderOptions>
  sidebar?: boolean | Partial<SidebarOptions>
  footer?: boolean | Partial<FooterOptions>
  content?: Partial<ContentOptions>

  /** Color scheme of the shell. `'auto'` follows `prefers-color-scheme`. */
  theme?: ThemeMode
  /** Scroll behaviour of the shell. Default `'content'`. */
  scrollMode?: ScrollMode
  /** Viewport width below which the layout switches to mobile mode. Default `768`. */
  mobileBreakpoint?: number
  /** Animate sidebar collapse / drawer / region transitions. Default `true`. */
  transition?: boolean

  /** Brand text rendered in the default logo slot. */
  title?: string
  /** Logo mark (1–3 characters or an emoji) rendered in the default logo slot. */
  logo?: string
  /** Shorthand for `footer.version`. */
  version?: string
  /** Accent color, injected as `--fl-primary`. */
  primaryColor?: string

  /** Collapsed state of the sidebar — use with `v-model:collapsed`. */
  collapsed?: boolean
}
