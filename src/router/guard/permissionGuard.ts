/*
 * @Date: 2024-03-20 16:44:21
 * @LastEditors: phil_litian
 */

import { useUserStore } from '@/store/modules/user';
import { usePermissionsStore } from '@s/modules/permissions'
import { RouteRecordRaw, Router } from 'vue-router';

export const createPermissionGuard = async (router: Router) => {
  const permissionStore = usePermissionsStore()
  const userStore = useUserStore()

  router.beforeEach(async (to, from, next) => {

    if( !permissionStore.getIsDynamicAddedRoute ) {
      const routes = await permissionStore.buildRoutesAction();

      routes.forEach(route => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })

      // 动态路由加载完成
      permissionStore.setDynamicAddedRoute(true)

      // 重点(经过多次尝试)
      // 现在的to动态路由加载之前的, 登录之后刷新会出现PAGE_NOT_FOUND_ROUTE的情况
      // 此处应当重定向到fullPath, 否则会出现加载404的情况
      next({ path: to.fullPath, replace: true, query: to.query });
      return
    }

    next()
  })
}
