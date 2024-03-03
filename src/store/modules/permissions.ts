/*
 * @Date: 2024-03-02 22:41:04
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import type { AppRouteRecordRaw } from '@/router/types' 
import { asyncRoutes } from '@/router/routes'


export const usePermissions = defineStore({
  id: 'app-permission',

  state: () => {
    return {

    }
  },

  getters: {

  },

  actions: {
    // 构建路由
    buildRoutesAction(): AppRouteRecordRaw[] {
      // TODO 数据持久化
      let routes =  asyncRoutes
      console.log('routes', routes);
      

      return routes
    }
  }
})