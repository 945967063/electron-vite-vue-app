import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { CreateRouterGuards } from './guards'

export const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@renderer/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASEURL),
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
