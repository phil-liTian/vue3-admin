/*
 * @Date: 2024-03-20 16:44:08
 * @LastEditors: phil_litian
 */
import { createPermissionGuard } from './permissionGuard'

export const setupRouterGuard = (router) => {
  // 权限守卫
  createPermissionGuard(router)  
  
  
}
