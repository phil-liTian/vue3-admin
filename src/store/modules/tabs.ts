/*
 * @Date: 2024-04-03 13:50:42
 * @LastEditors: phil_litian
 */
import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from "pinia";
import { useRedo } from '@h/web/usePage'
import { useAppStore } from '@s/modules/app'

const { getMultipleSetting } = useAppStore()
export interface MultipleTabState {
  tabList: RouteLocationNormalized[],
}
const { cache } = getMultipleSetting
export const useTabs = defineStore({
  id: 'app-multiple-tab',

  state: (): MultipleTabState => {
    return {
      tabList: cache ? [] : [] 
    }
  },

  getters: {
    getTabList(state): RouteLocationNormalized[] {
      return state.tabList
    }
  },

  actions: {
    async refreshPage() {
      const redo = useRedo()
      await redo()
    }
  }
})