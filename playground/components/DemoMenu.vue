<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayout } from '@cjnkm/vue-free-layout'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { DataLine, Document, Folder, Odometer, Setting, TrendCharts } from '@element-plus/icons-vue'

defineProps<{ collapsed: boolean }>()

const route = useRoute()
const router = useRouter()
const { isMobile, collapseSidebar, theme } = useLayout()

/** 子菜单里用 query 区分报表类型，所以激活项要用 fullPath。 */
const activeIndex = computed(() => (route.path === '/reports' ? route.fullPath : route.path))

const popupClass = computed(() => (theme.value === 'dark' ? 'db-el-menu-popup is-dark' : 'db-el-menu-popup'))

function onSelect(index: string) {
  if (index !== route.fullPath) router.push(index)
  // 移动端选中后自动收起抽屉
  if (isMobile.value) collapseSidebar()
}
</script>

<template>
  <ElMenu
    class="db-el-menu"
    :collapse="collapsed"
    :collapse-transition="false"
    :default-active="activeIndex"
    :unique-opened="true"
    @select="onSelect"
  >
    <ElMenuItem index="/">
      <ElIcon><Odometer /></ElIcon>
      <template #title>概览</template>
    </ElMenuItem>

    <ElMenuItem index="/projects">
      <ElIcon><Folder /></ElIcon>
      <template #title>项目</template>
    </ElMenuItem>

    <ElSubMenu index="reports" :popper-class="popupClass">
      <template #title>
        <ElIcon><DataLine /></ElIcon>
        <span>数据</span>
      </template>
      <ElMenuItem index="/reports?tab=daily">
        <ElIcon><TrendCharts /></ElIcon>
        <template #title>日报</template>
      </ElMenuItem>
      <ElMenuItem index="/reports?tab=weekly">
        <ElIcon><Document /></ElIcon>
        <template #title>周报</template>
      </ElMenuItem>
    </ElSubMenu>

    <ElMenuItem index="/settings">
      <ElIcon><Setting /></ElIcon>
      <template #title>偏好设置</template>
    </ElMenuItem>
  </ElMenu>
</template>
