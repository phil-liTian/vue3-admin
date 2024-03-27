/*
 * @Date: 2024-03-20 16:44:08
 * @LastEditors: phil_litian
 */
import { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { setRouteChange } from '@/logics/mitt/routeChange'

export const setupRouterGuard = (router) => {
  // 页面守卫
  createPageGuard(router)

  // 权限守卫
  createPermissionGuard(router)  
}

function createPageGuard(router: Router) {
  router.beforeEach((to) => {
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    
  })

}
