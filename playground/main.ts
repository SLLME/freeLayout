import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import FreeLayout from '@cjnkm/vue-free-layout'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Dashboard from './pages/Dashboard.vue'
import Projects from './pages/Projects.vue'
import Reports from './pages/Reports.vue'
import Settings from './pages/Settings.vue'
import './demo.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard, meta: { title: '概览' } },
    { path: '/projects', name: 'projects', component: Projects, meta: { title: '项目' } },
    { path: '/reports', name: 'reports', component: Reports, meta: { title: '数据报表' } },
    { path: '/settings', name: 'settings', component: Settings, meta: { title: '偏好设置' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

createApp(App).use(FreeLayout).use(router).mount('#app')
