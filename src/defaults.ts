import type {
  ContentOptions,
  FooterOptions,
  HeaderOptions,
  ResolvedContentOptions,
  ResolvedFooterOptions,
  ResolvedHeaderOptions,
  ResolvedSidebarOptions,
  SidebarOptions,
  SizeValue,
} from './types'

export const defaultHeaderOptions: ResolvedHeaderOptions = {
  visible: true,
  height: 56,
  position: 'top',
  sticky: true,
  bordered: true,
  logoVisible: true,
  logoWidth: undefined,
}

export const defaultSidebarOptions: ResolvedSidebarOptions = {
  visible: true,
  width: 240,
  collapsedWidth: 64,
  position: 'left',
  collapsible: true,
  defaultCollapsed: false,
  sticky: true,
  bordered: true,
  overlayOnMobile: true,
  mobileTrigger: false,
}

export const defaultFooterOptions: ResolvedFooterOptions = {
  visible: true,
  height: 44,
  position: 'bottom',
  sticky: false,
  bordered: true,
  align: 'center',
  fullWidth: false,
  version: undefined,
  text: undefined,
}

export const defaultContentOptions: ResolvedContentOptions = {
  padding: 20,
  maxWidth: undefined,
  scrollable: true,
  background: undefined,
}

/**
 * Merge a region prop into its defaults.
 * `false` only flips `visible`, `true` / `undefined` keep the defaults.
 */
export function resolveRegion<T extends { visible: boolean }>(
  input: boolean | Partial<T> | undefined | null,
  defaults: T,
): T {
  if (input === false) return { ...defaults, visible: false }
  if (input === true || input === undefined || input === null) return { ...defaults }
  return { ...defaults, ...input }
}

export function resolvePartial<T extends object>(
  input: Partial<T> | undefined | null,
  defaults: T,
): T {
  return input ? { ...defaults, ...input } : { ...defaults }
}

/** `20` -> `'20px'`, `'12rem'` -> `'12rem'`, `undefined` -> `undefined`. */
export function toCssSize(value: SizeValue | undefined): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : String(value)
}

export type { HeaderOptions, SidebarOptions, FooterOptions, ContentOptions }
