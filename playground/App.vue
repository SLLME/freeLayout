<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { ScrollMode, SidebarPosition, ThemeMode } from '@cjnkm/vue-free-layout'
import { FreeLayout } from '@cjnkm/vue-free-layout'
import DemoHeader from './components/DemoHeader.vue'
import DemoMenu from './components/DemoMenu.vue'
import SettingsPanel from './components/SettingsPanel.vue'

const route = useRoute()

// Deep links for sharing a specific state: ?theme=dark&pos=right&collapsed=1
const params = new URLSearchParams(window.location.search)

/** Everything the demo panel can change, mapped 1:1 onto FreeLayout props. */
const config = reactive({
  header: params.get('header') !== '0',
  sidebar: params.get('sidebar') !== '0',
  footer: params.get('footer') !== '0',
  footerFullWidth: params.get('fw') === '1',
  sidebarPosition: (params.get('pos') === 'right' ? 'right' : 'left') as SidebarPosition,
  theme: (params.get('theme') as ThemeMode) || 'light',
  collapsed: params.get('collapsed') === '1',
  scrollMode: (params.get('scroll') === 'page' ? 'page' : 'content') as ScrollMode,
  centered: params.get('centered') === '1',
})

const panelOpen = ref(false)
const pageTitle = computed(() => (route.meta.title as string) || '概览')

function toggleTheme() {
  config.theme = config.theme === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <FreeLayout
    v-model:collapsed="config.collapsed"
    title="Nebula"
    logo="N"
    :header="{ visible: config.header, height: 60, logoWidth: 248 }"
    :sidebar="{ visible: config.sidebar, width: 248, collapsedWidth: 64, position: config.sidebarPosition }"
    :footer="{ visible: config.footer, height: 46, fullWidth: config.footerFullWidth, version: '0.1.0', text: 'Nebula Console · MIT License' }"
    :content="{ padding: 24, maxWidth: config.centered ? 1120 : undefined }"
    :theme="config.theme"
    :scroll-mode="config.scrollMode"
  >
    <!-- 品牌区（红圈处） -->
    <template #logo="{ collapsed, isMobile }">
      <span class="fl-logo__mark">N</span>
      <span v-show="isMobile || !collapsed" class="fl-logo__text">Nebula</span>
    </template>

    <!-- 导航栏 -->
    <template #header>
      <DemoHeader :title="pageTitle" @settings="panelOpen = true" @theme="toggleTheme" />
    </template>

    <!-- 菜单栏 -->
    <template #menu="{ collapsed }">
      <DemoMenu :collapsed="collapsed" />
    </template>

    <template #sidebar-footer="{ collapsed }">
      <div class="db-user">
        <span class="db-avatar">林</span>
        <span v-show="!collapsed" class="db-user__meta">
          <strong>林一</strong>
          <small>管理员</small>
        </span>
      </div>
    </template>

    <!-- 内容区：router-view 就放在这里 -->
    <RouterView v-slot="{ Component }">
      <Transition name="db-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 底部版本号（默认插槽之外的自定义 footer） -->
    <template #footer>
      <span>Nebula Console · v0.1.0</span>
      <span class="db-footer__dot">·</span>
      <a href="https://www.npmjs.com/package/@cjnkm/vue-free-layout" target="_blank" rel="noreferrer">vue-free-layout</a>
    </template>

    <!-- 无导航栏时的兜底入口 + 布局设置抽屉（放在布局内以继承主题变量） -->
    <button
      v-if="!config.header"
      class="db-fab"
      :class="{ 'is-shift-left': config.sidebar && config.sidebarPosition === 'right' }"
      title="布局设置"
      @click="panelOpen = true"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.3a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.6 15H2.3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6V4.3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 19.4 11h.3a2 2 0 1 1 0 4h-.3z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <SettingsPanel v-model:open="panelOpen" :config="config" />
  </FreeLayout>
</template>
