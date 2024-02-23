/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as RouteRecordRaw[]
})


export const setupRouter = (app: App) => {
  console.log('router', router);
  console.log('import', import.meta);
  
  app.use(router)
}