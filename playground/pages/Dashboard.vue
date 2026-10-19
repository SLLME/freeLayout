<script setup lang="ts">
const stats = [
  { label: '本月活跃用户', value: '18,204', delta: '+12.4%', up: true, spark: [28, 36, 32, 48, 44, 62, 70] },
  { label: '新增项目', value: '46', delta: '+8.1%', up: true, spark: [18, 22, 30, 26, 38, 34, 46] },
  { label: '平均交付周期', value: '6.2 天', delta: '-4.7%', up: true, spark: [70, 62, 58, 60, 48, 44, 38] },
  { label: '待处理工单', value: '12', delta: '+2', up: false, spark: [20, 24, 18, 30, 26, 34, 30] },
]

const traffic = [
  { label: '周一', value: 42 },
  { label: '周二', value: 58 },
  { label: '周三', value: 51 },
  { label: '周四', value: 74 },
  { label: '周五', value: 66 },
  { label: '周六', value: 38 },
  { label: '周日', value: 47 },
]

const activities = [
  { who: '林一', action: '更新了', target: 'Nebula 控制台 2.0', time: '12 分钟前', tone: 'blue' },
  { who: '周舟', action: '合并了 PR', target: '#482 布局重构', time: '1 小时前', tone: 'green' },
  { who: '陈默', action: '创建了', target: '数据看板项目', time: '3 小时前', tone: 'purple' },
  { who: '系统', action: '完成部署', target: 'production / v0.1.0', time: '昨天 22:10', tone: 'gray' },
]

const maxTraffic = Math.max(...traffic.map((item) => item.value))
</script>

<template>
  <div class="db-page">
    <header class="db-page__head">
      <div>
        <h1>概览</h1>
        <p>团队本周的整体运行情况，数据每 10 分钟刷新一次。</p>
      </div>
      <div class="db-page__actions">
        <button class="db-btn">导出</button>
        <button class="db-btn db-btn--primary">新建项目</button>
      </div>
    </header>

    <div class="db-stats">
      <article v-for="item in stats" :key="item.label" class="db-card db-stat">
        <p class="db-stat__label">{{ item.label }}</p>
        <div class="db-stat__row">
          <strong class="db-stat__value">{{ item.value }}</strong>
          <span class="db-badge" :class="item.up ? 'is-up' : 'is-down'">{{ item.delta }}</span>
        </div>
        <div class="db-spark">
          <span
            v-for="(point, index) in item.spark"
            :key="index"
            class="db-spark__bar"
            :style="{ height: `${point}%` }"
          />
        </div>
      </article>
    </div>

    <div class="db-grid">
      <section class="db-card db-card--padded">
        <header class="db-card__head">
          <div>
            <h2>访问趋势</h2>
            <p>最近 7 天的会话数（千次）</p>
          </div>
          <span class="db-tag">周</span>
        </header>
        <div class="db-chart">
          <div v-for="bar in traffic" :key="bar.label" class="db-chart__col">
            <div class="db-chart__track">
              <span
                class="db-chart__bar"
                :style="{ height: `${(bar.value / maxTraffic) * 100}%` }"
                :title="`${bar.label}: ${bar.value}k`"
              />
            </div>
            <span class="db-chart__label">{{ bar.label }}</span>
          </div>
        </div>
      </section>

      <section class="db-card db-card--padded">
        <header class="db-card__head">
          <div>
            <h2>最新动态</h2>
            <p>来自团队成员的操作记录</p>
          </div>
          <a class="db-link" href="#/projects">全部</a>
        </header>
        <ul class="db-activity">
          <li v-for="item in activities" :key="item.target" class="db-activity__item">
            <span class="db-dot" :class="`is-${item.tone}`" />
            <div class="db-activity__body">
              <p>
                <strong>{{ item.who }}</strong> {{ item.action }}
                <em>{{ item.target }}</em>
              </p>
              <small>{{ item.time }}</small>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <section class="db-card db-card--padded">
      <header class="db-card__head">
        <div>
          <h2>区域说明</h2>
          <p>这四个区域都可以单独隐藏、调整尺寸或换边</p>
        </div>
      </header>
      <div class="db-legend">
        <div class="db-legend__item">
          <span class="db-legend__swatch" style="background: #e11d48" />
          <div><strong>Logo 区</strong><small>#logo 插槽，宽度默认与菜单栏对齐</small></div>
        </div>
        <div class="db-legend__item">
          <span class="db-legend__swatch" style="background: #2563eb" />
          <div><strong>导航栏</strong><small>#header / #nav / #header-right 插槽</small></div>
        </div>
        <div class="db-legend__item">
          <span class="db-legend__swatch" style="background: #16a34a" />
          <div><strong>菜单栏</strong><small>#menu 插槽，可折叠、可换到右侧</small></div>
        </div>
        <div class="db-legend__item">
          <span class="db-legend__swatch" style="background: #ea580c" />
          <div><strong>内容区</strong><small>默认插槽，放 &lt;router-view /&gt;</small></div>
        </div>
      </div>
    </section>
  </div>
</template>
