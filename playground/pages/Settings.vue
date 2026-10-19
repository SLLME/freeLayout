<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  site: 'Nebula Console',
  email: 'team@nebula.dev',
  locale: 'zh-CN',
  notifyEmail: true,
  notifyDesktop: false,
  weekly: true,
})
</script>

<template>
  <div class="db-page db-page--narrow">
    <header class="db-page__head">
      <div>
        <h1>偏好设置</h1>
        <p>这是一个普通页面，用来验证内容区滚动与路由切换。</p>
      </div>
      <div class="db-page__actions">
        <button class="db-btn db-btn--primary">保存更改</button>
      </div>
    </header>

    <section class="db-card db-card--padded">
      <h2 class="db-section-title">基础信息</h2>
      <div class="db-form">
        <label class="db-input">
          <span>站点名称</span>
          <input v-model="form.site" type="text" />
        </label>
        <label class="db-input">
          <span>联系邮箱</span>
          <input v-model="form.email" type="email" />
        </label>
        <label class="db-input">
          <span>默认语言</span>
          <select v-model="form.locale">
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </label>
      </div>
    </section>

    <section class="db-card db-card--padded">
      <h2 class="db-section-title">通知</h2>
      <div class="db-list">
        <button class="db-switch-row" @click="form.notifyEmail = !form.notifyEmail">
          <span>邮件通知 <small>重要变更通过邮件提醒</small></span>
          <span class="db-switch" :class="{ 'is-on': form.notifyEmail }" />
        </button>
        <button class="db-switch-row" @click="form.notifyDesktop = !form.notifyDesktop">
          <span>桌面通知 <small>浏览器推送，需要授权</small></span>
          <span class="db-switch" :class="{ 'is-on': form.notifyDesktop }" />
        </button>
        <button class="db-switch-row" @click="form.weekly = !form.weekly">
          <span>每周摘要 <small>每周一 9:00 发送</small></span>
          <span class="db-switch" :class="{ 'is-on': form.weekly }" />
        </button>
      </div>
    </section>

    <section class="db-card db-card--padded db-danger">
      <div>
        <h2 class="db-section-title">危险操作</h2>
        <p class="db-muted">删除工作区后，所有项目与数据将无法恢复。</p>
      </div>
      <button class="db-btn db-btn--danger">删除工作区</button>
    </section>
  </div>
</template>
