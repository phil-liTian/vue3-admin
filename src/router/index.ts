/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as RouteRecordRaw[],
  // 是否禁止尾部斜线。
  strict: true,
  // 当在页面之间导航时控制滚动的功能
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export const setupRouter = (app: App) => {
  app.use(router)
}
