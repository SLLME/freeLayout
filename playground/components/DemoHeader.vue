<script setup lang="ts">
import { useLayout } from '@cjnkm/vue-free-layout'

defineProps<{ title?: string }>()
const emit = defineEmits<{ (e: 'settings'): void; (e: 'theme'): void }>()

// Any descendant of <FreeLayout> can read the layout state.
const { isMobile, toggleSidebar, theme } = useLayout()
</script>

<template>
  <div class="db-header">
    <button v-if="isMobile" class="db-icon-btn" aria-label="打开菜单" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <div class="db-crumb">
      <span class="db-crumb__root">工作台</span>
      <span class="db-crumb__sep">/</span>
      <span class="db-crumb__current">{{ title }}</span>
    </div>

    <label class="db-search">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <path d="M16 16l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <input type="search" placeholder="搜索项目、成员…" />
      <kbd>⌘K</kbd>
    </label>

    <div class="db-header__actions">
      <button class="db-icon-btn" :aria-label="theme === 'dark' ? '切换到浅色' : '切换到深色'" @click="emit('theme')">
        <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path
            d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button class="db-icon-btn" aria-label="布局设置" @click="emit('settings')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <circle cx="15" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <circle cx="9" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <circle cx="17" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      </button>

      <span class="db-avatar db-avatar--sm">林</span>
    </div>
  </div>
</template>
