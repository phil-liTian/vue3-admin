/*
 * @Date: 2024-02-21 14:53:21
 * @LastEditors: phil_litian
 * 整个应用到store
 */

import { defineStore } from 'pinia'
import { ThemeEnum } from '@e/appEnum'

interface AppState {
  pageLoading: boolean,
  darkMode: ThemeEnum,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false
  }),

  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },

    getDarkMode(state): 'light' | 'dark' | string {
      return state.darkMode
    }
  },
  
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
    }
  }
})