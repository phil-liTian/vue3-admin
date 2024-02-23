/*
 * @Date: 2024-02-21 14:53:21
 * @LastEditors: phil_litian
 * 整个应用到store
 */

import { defineStore } from 'pinia'

interface AppState {
  pageLoading: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false
  }),

  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    }
  },
  
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    }
  }
})