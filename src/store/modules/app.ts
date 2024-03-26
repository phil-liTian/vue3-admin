/*
 * @Date: 2024-02-21 14:53:21
 * @LastEditors: phil_litian
 * 整个应用到store
 */
import { MenuSetting, ProjectConfig } from '#/config'
import { defineStore } from 'pinia'
import { ThemeEnum } from '@e/appEnum'
import { PROJ_CFG_KEY } from '@e/cacheEnum'
import { Persistent } from '@u/cache/Persistent'
import { store } from '..'

interface AppState {
  pageLoading: boolean,
  darkMode: ThemeEnum,
  // 项目配置
  projectConfig?: Nullable<ProjectConfig>,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY)
  }),

  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },

    getDarkMode(state): 'light' | 'dark' | string {
      return state.darkMode
    },

    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },

    getMenuSetting(state): MenuSetting {
      return this.getProjectConfig.menuSetting
    }
  },
  
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
    },

    setProjectConfig(config: Partial<ProjectConfig>): void {
      this.projectConfig = Object.assign(this.projectConfig || {}, config) as ProjectConfig
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    setMenuSetting() {
      
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
