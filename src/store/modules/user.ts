/*
 * @Date: 2024-03-02 17:15:43
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { usePermissions } from './permissions'


export const useUserStore = defineStore({
  id: 'app-user',

  state: () => {
    return {

    }
  },
  
  getters: {

  },

  actions: {
    login() {
      const { buildRoutesAction } = usePermissions()
      const routes = buildRoutesAction()

      routes.forEach(route => {
        router.addRoute(route as RouteRecordRaw)
      })

      router.replace('/dashBoard')
    }
  }
})