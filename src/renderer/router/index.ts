import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { CreateRouterGuards } from './guards'

export const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@renderer/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@renderer/views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: BaseRoutes,
  strict: true,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
export function mountRouter(app: App) {
  app.use(router)
  CreateRouterGuards(router)
}
export default router
