<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isWeekly = computed(() => route.query.tab === 'weekly')
const title = computed(() => (isWeekly.value ? '周报' : '日报'))

const rows = computed(() =>
  isWeekly.value
    ? [
        { name: '第 42 周', sessions: '128,430', growth: '+9.2%', owner: '林一' },
        { name: '第 41 周', sessions: '117,620', growth: '+4.8%', owner: '林一' },
        { name: '第 40 周', sessions: '112,240', growth: '-1.3%', owner: '周舟' },
      ]
    : [
        { name: '10-19', sessions: '18,204', growth: '+12.4%', owner: '林一' },
        { name: '10-18', sessions: '16,980', growth: '+3.1%', owner: '林一' },
        { name: '10-17', sessions: '15,420', growth: '-2.6%', owner: '周舟' },
      ],
)
</script>

<template>
  <div class="db-page db-page--narrow">
    <header class="db-page__head">
      <div>
        <h1>{{ title }}</h1>
        <p>
          这个页面由 Element Plus 子菜单切换，地址是
          <code class="db-inline-code">/reports?tab={{ isWeekly ? 'weekly' : 'daily' }}</code>
        </p>
      </div>
      <div class="db-page__actions">
        <button class="db-btn">导出 CSV</button>
      </div>
    </header>

    <section class="db-card">
      <div class="db-table-wrap">
        <table class="db-table">
          <thead>
            <tr>
              <th>周期</th>
              <th>会话数</th>
              <th>环比</th>
              <th>负责人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.name">
              <td><strong>{{ row.name }}</strong></td>
              <td>{{ row.sessions }}</td>
              <td>
                <span class="db-badge" :class="row.growth.startsWith('+') ? 'is-up' : 'is-down'">
                  {{ row.growth }}
                </span>
              </td>
              <td class="db-muted">{{ row.owner }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
