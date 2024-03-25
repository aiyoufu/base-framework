import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

// 公共路由
export const constantRoutes = [
  { path: '/', redirect: '/home' },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
  },
  {
    path: '/home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 导航守卫

export default router
