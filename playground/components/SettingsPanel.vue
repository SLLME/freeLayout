<script setup lang="ts">
import type { ScrollMode, SidebarPosition, ThemeMode } from '@cjnkm/vue-free-layout'

const open = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  config: {
    header: boolean
    sidebar: boolean
    footer: boolean
    footerFullWidth: boolean
    sidebarPosition: SidebarPosition
    theme: ThemeMode
    collapsed: boolean
    scrollMode: ScrollMode
    centered: boolean
  }
}>()

const { config } = props
</script>

<template>
  <Transition name="db-panel">
    <div v-if="open" class="db-panel-root">
      <div class="db-panel__backdrop" @click="open = false" />
      <aside class="db-panel" role="dialog" aria-label="布局设置">
        <header class="db-panel__head">
          <div>
            <h2>布局设置</h2>
            <p>实时调整 FreeLayout 的 props</p>
          </div>
          <button class="db-icon-btn" aria-label="关闭" @click="open = false">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </header>

        <div class="db-panel__body">
          <section class="db-field">
            <p class="db-field__label">显示区域</p>
            <button class="db-switch-row" @click="config.header = !config.header">
              <span>顶部导航栏 <code>header</code></span>
              <span class="db-switch" :class="{ 'is-on': config.header }" />
            </button>
            <button class="db-switch-row" @click="config.sidebar = !config.sidebar">
              <span>左侧菜单栏 <code>sidebar</code></span>
              <span class="db-switch" :class="{ 'is-on': config.sidebar }" />
            </button>
            <button class="db-switch-row" @click="config.footer = !config.footer">
              <span>底部版本号 <code>footer</code></span>
              <span class="db-switch" :class="{ 'is-on': config.footer }" />
            </button>
            <button class="db-switch-row" @click="config.footerFullWidth = !config.footerFullWidth">
              <span>底栏横跨整页 <code>footer.fullWidth</code></span>
              <span class="db-switch" :class="{ 'is-on': config.footerFullWidth }" />
            </button>
          </section>

          <section class="db-field">
            <p class="db-field__label">菜单栏位置</p>
            <div class="db-segment">
              <button
                :class="{ 'is-active': config.sidebarPosition === 'left' }"
                @click="config.sidebarPosition = 'left'"
              >
                左侧
              </button>
              <button
                :class="{ 'is-active': config.sidebarPosition === 'right' }"
                @click="config.sidebarPosition = 'right'"
              >
                右侧
              </button>
            </div>
          </section>

          <section class="db-field">
            <p class="db-field__label">菜单栏状态</p>
            <button class="db-switch-row" @click="config.collapsed = !config.collapsed">
              <span>折叠为图标栏 <code>v-model:collapsed</code></span>
              <span class="db-switch" :class="{ 'is-on': config.collapsed }" />
            </button>
          </section>

          <section class="db-field">
            <p class="db-field__label">主题</p>
            <div class="db-segment">
              <button :class="{ 'is-active': config.theme === 'light' }" @click="config.theme = 'light'">
                浅色
              </button>
              <button :class="{ 'is-active': config.theme === 'dark' }" @click="config.theme = 'dark'">
                深色
              </button>
              <button :class="{ 'is-active': config.theme === 'auto' }" @click="config.theme = 'auto'">
                跟随系统
              </button>
            </div>
          </section>

          <section class="db-field">
            <p class="db-field__label">滚动方式 <code>scrollMode</code></p>
            <div class="db-segment">
              <button
                :class="{ 'is-active': config.scrollMode === 'content' }"
                @click="config.scrollMode = 'content'"
              >
                内容区滚动
              </button>
              <button
                :class="{ 'is-active': config.scrollMode === 'page' }"
                @click="config.scrollMode = 'page'"
              >
                整页滚动
              </button>
            </div>
          </section>

          <section class="db-field">
            <p class="db-field__label">内容宽度</p>
            <button class="db-switch-row" @click="config.centered = !config.centered">
              <span>限制最大宽度并居中 <code>content.maxWidth</code></span>
              <span class="db-switch" :class="{ 'is-on': config.centered }" />
            </button>
          </section>

          <p class="db-panel__tip">
            窗口宽度小于 768px 时，菜单栏会自动变成抽屉，可用导航栏左侧按钮开合。
          </p>
        </div>
      </aside>
    </div>
  </Transition>
</template>
