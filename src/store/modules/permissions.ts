/*
 * @Date: 2024-03-02 22:41:04
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import type { AppRouteRecordRaw } from '@/router/types' 
import { asyncRoutes } from '@/router/routes'
import { store } from "..";
import { Menu } from '@/router/types'
import { useAppStoreWithOut } from "./app";
import ProjectSetting from '@/settings/projectSetting'
import { PermissionModeEnum } from '@e/appEnum'
import { transformRouteToMenu } from "@/router/helper/menuHelper";
import { useUserStoreWithOut } from "./user";
import { filter } from "@/utils/helper/treeHelper";


export const usePermissionsStore = defineStore({
  id: 'app-permission',

  state: () => {
    return {
      // 路由是否动态添加
      isDynamicAddRoute: false,
      // 菜单列表(前端权限)
      frontMenuList: [],
      // 后端菜单权限
      backMenuList: []
    }
  },

  getters: {
    getIsDynamicAddedRoute(state) {
      return state.isDynamicAddRoute
    },

    getFrontMenuList(state) {
      return state.frontMenuList
    },

    getBackMenuList(state) {
      return state.backMenuList
    }
  },

  actions: {
    // 前端菜单
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    // 构建路由
    buildRoutesAction(): AppRouteRecordRaw[] {
      const useAppStore = useAppStoreWithOut()
      const useUserStore = useUserStoreWithOut()
      const { permissionMode = ProjectSetting.permissionMode } = useAppStore.getProjectConfig
      const roleList = useUserStore.getRoleList || []
      let routes = asyncRoutes

      // 路由角色权限遍历器
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}

        if ( !roles ) return true
        return (roles as any[]).some(role => roleList.includes(role))
      }

      // 路由ignoreRoute: true遍历器
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {

      }
      
      switch(permissionMode) {
        case PermissionModeEnum.ROUTE_MAPPING: {
          // 对路由进行角色权限过滤
          routes = filter(asyncRoutes, routeFilter)

          const menuList = transformRouteToMenu(routes, true)

          // 对ignoreRoute: true的路由进行过滤
          //routes = filter(asyncRoutes, routeRemoveIgnoreFilter)

          // 排序
          menuList.sort((a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));
          this.setFrontMenuList(menuList)

          // 将多级路由转换成二级路由
          break
        }
        case PermissionModeEnum.BACK: {
          
          break
        }
        case PermissionModeEnum.ROLE: {
          break
        }
      }
      
      return routes
    },

    // 设置是否动态添加路由的参数
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddRoute = added
    }
  }
})

export const usePermissionsStoreWithOut = () => {
  return usePermissionsStore(store)
}
