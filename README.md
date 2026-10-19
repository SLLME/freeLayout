# @cjnkm/vue-free-layout

一个 Vue 3 的「应用外壳」布局组件：**导航栏 + 菜单栏 + 内容区 + 底部版本号**。
每个区域都可以独立隐藏、改尺寸、换边；内容区就是一个插槽，`<router-view />` 直接放进去。

- 🧩 **区域可插拔** —— `header` / `sidebar` / `footer` 传 `false` 即隐藏，传对象即配置
- ↔️ **位置可调** —— 菜单栏左右换边，导航栏与底栏上下换边
- 📐 **尺寸可调** —— 高度、宽度、折叠宽度、内边距全部走 props
- 📱 **响应式** —— 小于断点自动切换为抽屉式菜单，带遮罩
- 🌗 **主题** —— 内置浅色 / 深色 / 跟随系统，全部通过 CSS 变量暴露
- 🎛 **状态可读** —— 任意子组件用 `useLayout()` 拿到折叠状态、切换方法
- 🪶 **零依赖** —— 只有 `vue` 一个 peer dependency，CSS 约 8 kB

---

## 安装

```bash
npm i @cjnkm/vue-free-layout
# 或 pnpm add @cjnkm/vue-free-layout / yarn add @cjnkm/vue-free-layout
```

样式随入口自动引入（`import '@cjnkm/vue-free-layout'` 会带上 CSS）；也可以手动引入：

```ts
import '@cjnkm/vue-free-layout/style.css'
```

## 快速开始

```ts
// main.ts
import { createApp } from 'vue'
import FreeLayout from '@cjnkm/vue-free-layout'
import App from './App.vue'

createApp(App).use(FreeLayout).mount('#app')
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <FreeLayout title="Nebula" logo="N" version="0.1.0">
    <!-- 导航栏里的内容（可选） -->
    <template #header-right>
      <button>退出</button>
    </template>

    <!-- 菜单栏 -->
    <template #menu="{ collapsed }">
      <RouterLink to="/">概览</RouterLink>
      <RouterLink to="/projects">项目</RouterLink>
      <span v-if="!collapsed">折叠时只显示图标</span>
    </template>

    <!-- 内容区：router-view 放这里 -->
    <RouterView />

    <!-- 底部版本号（不传则显示 v0.1.0） -->
  </FreeLayout>
</template>
```

布局结构：

```
┌──────────────────────────────────────────────┐
│  logo   │            导航栏                   │  header
├─────────┼────────────────────────────────────┤
│         │                                    │
│ 菜单栏  │            内容区                   │  sidebar + content
│         │      （默认插槽 / router-view）      │
│         ├────────────────────────────────────┤
│         │          底部版本号                  │  footer
└─────────┴────────────────────────────────────┘
```

> 底栏默认只占内容区宽度（如草图）；想要横跨整页（压在菜单栏下方）用 `footer.fullWidth: true`。

---

## Props

所有区域都支持两种写法：`false` 隐藏、对象配置。

```vue
<FreeLayout :header="false" :sidebar="{ width: 280, position: 'right' }" />
```

### 顶层

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `header` | `boolean \| HeaderOptions` | `true` | 顶部导航栏 |
| `sidebar` | `boolean \| SidebarOptions` | `true` | 菜单栏 |
| `footer` | `boolean \| FooterOptions` | `true` | 底部版本号 |
| `content` | `ContentOptions` | — | 内容区 |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 主题 |
| `scrollMode` | `'content' \| 'page'` | `'content'` | 内容区滚动 / 整页滚动 |
| `mobileBreakpoint` | `number` | `768` | 小于该宽度进入移动端模式 |
| `transition` | `boolean` | `true` | 是否启用折叠 / 抽屉动画 |
| `title` | `string` | — | 默认 logo 插槽里的品牌名 |
| `logo` | `string` | — | 默认 logo 插槽里的图标字符 |
| `version` | `string` | — | 简写，等价于 `footer.version` |
| `primaryColor` | `string` | — | 主色，注入为 `--fl-primary` |
| `collapsed` | `boolean` | — | 配合 `v-model:collapsed` 受控折叠 |

### HeaderOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `true` | 是否显示 |
| `height` | `number \| string` | `56` | 高度 |
| `position` | `'top' \| 'bottom'` | `'top'` | 贴顶还是贴底 |
| `sticky` | `boolean` | `true` | 整页滚动时吸顶 |
| `bordered` | `boolean` | `true` | 显示分隔线 |
| `logoVisible` | `boolean` | `true` | 是否显示 logo 区 |
| `logoWidth` | `number \| string` | 与菜单栏同宽 | logo 区宽度，`'auto'` 为自适应 |

### SidebarOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `true` | 是否显示 |
| `width` | `number \| string` | `240` | 展开宽度 |
| `collapsedWidth` | `number \| string` | `64` | 折叠宽度 |
| `position` | `'left' \| 'right'` | `'left'` | 停靠哪一侧 |
| `collapsible` | `boolean` | `true` | 是否显示内置折叠按钮 |
| `defaultCollapsed` | `boolean` | `false` | 初始是否折叠（非受控时生效） |
| `sticky` | `boolean` | `true` | 整页滚动时吸附 |
| `bordered` | `boolean` | `true` | 显示分隔线 |
| `overlayOnMobile` | `boolean` | `true` | 移动端变为抽屉 |
| `mobileTrigger` | `boolean` | `false` | 移动端抽屉关闭时显示浮动开关 |

### FooterOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `true` | 是否显示 |
| `height` | `number \| string` | `44` | 高度 |
| `position` | `'top' \| 'bottom'` | `'bottom'` | 贴底还是贴顶 |
| `sticky` | `boolean` | `false` | 整页滚动时吸底 |
| `bordered` | `boolean` | `true` | 显示分隔线 |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | 内容对齐 |
| `fullWidth` | `boolean` | `false` | 横跨整页（含菜单栏下方） |
| `version` | `string` | — | 无 `footer` 插槽时显示 `v{version}` |
| `text` | `string` | — | 无 `footer` 插槽时显示的文案 |

### ContentOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `padding` | `number \| string` | `20` | 内边距 |
| `maxWidth` | `number \| string` | — | 内容最大宽度，居中 |
| `scrollable` | `boolean` | `true` | 内容区是否可滚动 |
| `background` | `string` | `transparent` | 内容区背景 |

---

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `logo` | `{ title, collapsed, isMobile }` | 品牌区，默认渲染 `logo` + `title` |
| `header` | `{ collapsed, isMobile }` | 整个导航栏内容（会覆盖下面三个） |
| `header-left` | — | 导航栏左侧 |
| `nav` | — | 导航栏中部（菜单、面包屑） |
| `header-right` | — | 导航栏右侧（搜索、头像） |
| `toggle` | `{ collapsed }` | 自定义折叠按钮图标 |
| `menu` | `{ collapsed, isMobile }` | 菜单栏主体 |
| `sidebar-footer` | `{ collapsed }` | 菜单栏底部（用户信息） |
| `default` | `{ collapsed }` | **内容区，放 `<router-view />`** |
| `footer` | — | 底部版本号内容 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:collapsed` | `boolean` | 配合 `v-model:collapsed` |
| `toggle-sidebar` | `boolean` | 折叠状态变化 |

## useLayout()

在 `<FreeLayout>` 的任意后代组件里读取布局状态（做汉堡按钮、面包屑、自适应菜单都靠它）：

```vue
<script setup lang="ts">
import { useLayout } from '@cjnkm/vue-free-layout'

const { collapsed, toggleSidebar, isMobile, theme } = useLayout()
</script>

<template>
  <button v-if="isMobile" @click="toggleSidebar">☰</button>
</template>
```

返回值：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `collapsed` | `ComputedRef<boolean>` | 桌面为「折叠」，移动端为「抽屉关闭」 |
| `toggleSidebar()` | `() => void` | 切换 |
| `setCollapsed(v)` / `collapseSidebar()` / `expandSidebar()` | — | 显式控制 |
| `headerVisible` / `sidebarVisible` / `footerVisible` | `ComputedRef<boolean>` | 区域是否显示 |
| `isMobile` | `ComputedRef<boolean>` | 是否处于移动端模式 |
| `viewportWidth` | `Ref<number>` | 视口宽度 |
| `header` / `sidebar` / `footer` / `content` | `ComputedRef<Options>` | 合并后的区域配置 |
| `theme` | `ComputedRef<'light' \| 'dark'>` | `'auto'` 已解析 |

组件实例上也可以用 `ref` 调用：`layoutRef.value?.toggleSidebar()`。

---

## 主题与 CSS 变量

深色主题内置，`theme="auto"` 跟随系统。要接入自己的设计系统，覆盖变量即可：

```css
.fl-layout {
  --fl-primary: #7c3aed;
  --fl-bg: #fafafa;
  --fl-surface: #fff;
  --fl-border-color: #ececf1;
  --fl-radius: 12px;
}
```

常用变量：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `--fl-header-height` | `56px` | 由 `header.height` 写入 |
| `--fl-sidebar-width` | `240px` | 由 `sidebar.width` 写入 |
| `--fl-sidebar-collapsed-width` | `64px` | 折叠宽度 |
| `--fl-footer-height` | `44px` | 底栏高度 |
| `--fl-content-padding` | `20px` | 内容内边距 |
| `--fl-sidebar-padding` | `8px` | 菜单区内边距 |
| `--fl-primary` | `#2563eb` | 主色 |
| `--fl-primary-weak` | `#eef3ff` | 主色浅底（选中态） |
| `--fl-bg` / `--fl-surface` | `#f3f5f9` / `#fff` | 背景 / 面板 |
| `--fl-text` / `--fl-text-weak` / `--fl-text-faint` | — | 三级文字色 |
| `--fl-border-color` | `#e6e8ee` | 分隔线 |
| `--fl-hover` | `rgba(15,23,42,.05)` | 悬浮底色 |
| `--fl-duration` | `.22s` | 动画时长 |
| `--fl-height` | `100vh` | 外壳高度（嵌在页面里时可改） |

所有变量都挂在 `.fl-layout` 上，不会污染全局。深色主题对应 `.fl-layout[data-theme='dark']`。

---

## 常见组合

**只保留内容区**（做落地页外壳）：

```vue
<FreeLayout :header="false" :sidebar="false" :footer="false" />
```

**右侧菜单 + 默认折叠**：

```vue
<FreeLayout
  :sidebar="{ position: 'right', width: 260, defaultCollapsed: true }"
  :content="{ padding: 24, maxWidth: 1080 }"
/>
```

**整页滚动 + 吸顶导航**（长文档、表单页）：

```vue
<FreeLayout scroll-mode="page" :header="{ sticky: true }" :content="{ scrollable: false }" />
```

**受控折叠**：

```vue
<FreeLayout v-model:collapsed="collapsed" />
```

**移动端抽屉**：宽度小于 `mobileBreakpoint`（默认 768）时菜单栏自动变成带遮罩的抽屉，关闭状态下不占位；在导航栏里用 `useLayout().toggleSidebar()` 打开即可。

---

## 接入 Element Plus 菜单

菜单栏只是一个插槽，放什么由你决定。把布局的折叠状态接到 `el-menu` 的 `:collapse` 上即可：

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLayout } from '@cjnkm/vue-free-layout'

const route = useRoute()
const { collapsed } = useLayout()
</script>

<template>
  <FreeLayout :sidebar="{ width: 248, collapsedWidth: 64 }">
    <template #menu>
      <el-menu
        :collapse="collapsed"
        :collapse-transition="false"
        :default-active="route.path"
        router
      >
        <el-menu-item index="/">
          <el-icon><Odometer /></el-icon>
          <template #title>概览</template>
        </el-menu-item>

        <el-sub-menu index="reports">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>数据</span>
          </template>
          <el-menu-item index="/reports?tab=daily">日报</el-menu-item>
          <el-menu-item index="/reports?tab=weekly">周报</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>偏好设置</template>
        </el-menu-item>
      </el-menu>
    </template>

    <RouterView />
  </FreeLayout>
</template>
```

几个要点：

- **折叠宽度对齐**：`el-menu--collapse` 固定 64px，把 `sidebar.collapsedWidth` 也设为 `64`，折叠后图标才不会错位；
- **关掉 el-menu 自己的过渡**：`:collapse-transition="false"`，宽度动画交给布局统一处理，避免两层动画打架；
- **不要维护第二份折叠状态**：`:collapse` 直接用 `useLayout().collapsed`；
- **移动端收抽屉**：`@select` 里判断 `isMobile` 后调用 `collapseSidebar()`（演示站已实现）；
- **配色跟随主题**：覆盖 Element Plus 的菜单变量即可，不需要写两套样式：

```css
.db-el-menu {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--fl-text-weak);
  --el-menu-active-color: var(--fl-primary);
  --el-menu-hover-bg-color: var(--fl-hover);
  border-right: 0;
}
```

> 子菜单的弹出层会被 teleport 到 `body`，取不到 `.fl-layout` 上的 CSS 变量，需要单独配色。演示站里用 `popper-class` 加 `is-dark` 类做了深浅两套，见 `playground/demo.css`。

完整可运行示例见 `playground/components/DemoMenu.vue`。

---

## 说明

- 组件不假设路由方案，`router-view` 只是放在默认插槽里的普通内容。
- 默认 `scrollMode="content"`，外壳高度为 `100vh`，只有内容区滚动；页面内嵌时可用 `--fl-height` 或外层样式覆盖高度。
- 支持 SSR：`useBreakpoint` / `useTheme` 在 `onMounted` 后才读取 `window`。

## License

MIT
