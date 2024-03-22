/*
 * @Date: 2024-02-26 10:08:21
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import { store } from '@s/index'
import type { LocalSetting, LocalType } from '#/config'
import { localeSetting } from '@/settings/localeSetting'

interface LocaleState {
  localeInfo: LocalSetting
}

export const useLocalStore = defineStore({
  id: 'app-locale',

  state: (): LocaleState => {
    // 返回一个对象 可实现定义多个不同数据
    return {
      localeInfo: localeSetting
    }
  },

  getters: {
    // 默认语言
    getLocale: (state): LocalType => {
      return state.localeInfo.locale ?? 'zh-CN'
    }
  },

  actions: {
    setLocaleInfo(info) {
      this.localeInfo = { ...this.localeInfo, ...info }
    }
  }
})

// 处理报错：getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
export function useLocalStoreWithout() {
  return useLocalStore(store)
}