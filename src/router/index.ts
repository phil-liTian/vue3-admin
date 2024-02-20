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
  
  app.use(router)
}