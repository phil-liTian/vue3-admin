/*
 * @Date: 2024-02-21 14:53:21
 * @LastEditors: phil_litian
 * 整个应用到store
 */
import { MenuSetting, ProjectConfig, HeaderSetting, MultiTabsSetting, TransitionSetting } from '#/config'
import { defineStore } from 'pinia'
import { ThemeEnum } from '@e/appEnum'
import { PROJ_CFG_KEY } from '@e/cacheEnum'
import { Persistent } from '@u/cache/Persistent'
import { store } from '..'
import { deepMerge } from '@/utils'

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
    },

    getHeaderSetting(state): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },

    getMultipleSetting(state): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },

    getTransitionSetting(state): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    }
  },
  
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config) as ProjectConfig
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    setMenuSetting(setting: Partial<MenuSetting>) {
      this.projectConfig!.menuSetting = deepMerge(this.projectConfig.menuSetting || {}, setting)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    setHeaderSetting(setting: Partial<HeaderSetting>) {
      this.projectConfig!.headerSetting = deepMerge(this.projectConfig.headerSetting || {}, setting)

      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
