<script setup lang="ts">
import { computed, ref } from 'vue'

const keyword = ref('')
type FilterKey = 'all' | 'active' | 'paused' | 'done'
const filter = ref<FilterKey>('all')

const filterOptions: { key: FilterKey; text: string }[] = [
  { key: 'all', text: '全部' },
  { key: 'active', text: '进行中' },
  { key: 'paused', text: '已暂停' },
  { key: 'done', text: '已完成' },
]

const projects = [
  { name: 'Nebula 控制台 2.0', owner: '林一', members: ['林', '周', '陈'], status: 'active', progress: 78, updated: '12 分钟前' },
  { name: '数据看板重构', owner: '陈默', members: ['陈', '赵'], status: 'active', progress: 54, updated: '1 小时前' },
  { name: '开放平台 API', owner: '周舟', members: ['周', '林', '吴', '许'], status: 'paused', progress: 31, updated: '昨天' },
  { name: '移动端适配', owner: '赵敏', members: ['赵'], status: 'done', progress: 100, updated: '3 天前' },
  { name: '权限中心', owner: '吴迪', members: ['吴', '陈'], status: 'active', progress: 62, updated: '4 天前' },
  { name: '日志检索', owner: '许澄', members: ['许', '周'], status: 'done', progress: 100, updated: '上周' },
]

const statusMap: Record<string, { text: string; tone: string }> = {
  active: { text: '进行中', tone: 'blue' },
  paused: { text: '已暂停', tone: 'amber' },
  done: { text: '已完成', tone: 'green' },
}

const filtered = computed(() =>
  projects.filter((item) => {
    const matchStatus = filter.value === 'all' || item.status === filter.value
    const matchKeyword =
      !keyword.value.trim() ||
      item.name.toLowerCase().includes(keyword.value.trim().toLowerCase()) ||
      item.owner.includes(keyword.value.trim())
    return matchStatus && matchKeyword
  }),
)
</script>

<template>
  <div class="db-page">
    <header class="db-page__head">
      <div>
        <h1>项目</h1>
        <p>共 {{ projects.length }} 个项目，当前筛选出 {{ filtered.length }} 个。</p>
      </div>
      <div class="db-page__actions">
        <button class="db-btn db-btn--primary">新建项目</button>
      </div>
    </header>

    <section class="db-card">
      <div class="db-toolbar">
        <label class="db-search db-search--inline">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
            <path d="M16 16l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <input v-model="keyword" type="search" placeholder="搜索项目或负责人" />
        </label>
        <div class="db-chips">
          <button
            v-for="option in filterOptions"
            :key="option.key"
            class="db-chip"
            :class="{ 'is-active': filter === option.key }"
            @click="filter = option.key"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div class="db-table-wrap">
        <table class="db-table">
          <thead>
            <tr>
              <th>项目名称</th>
              <th>负责人</th>
              <th>成员</th>
              <th>状态</th>
              <th>进度</th>
              <th>最近更新</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.name">
              <td><strong>{{ item.name }}</strong></td>
              <td>{{ item.owner }}</td>
              <td>
                <div class="db-avatars">
                  <span v-for="member in item.members" :key="member" class="db-avatar db-avatar--xs">
                    {{ member }}
                  </span>
                </div>
              </td>
              <td>
                <span class="db-badge" :class="`is-${statusMap[item.status].tone}`">
                  {{ statusMap[item.status].text }}
                </span>
              </td>
              <td>
                <div class="db-progress">
                  <span class="db-progress__bar" :style="{ width: `${item.progress}%` }" />
                </div>
                <small class="db-muted">{{ item.progress }}%</small>
              </td>
              <td class="db-muted">{{ item.updated }}</td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="6" class="db-empty">没有匹配的项目</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
