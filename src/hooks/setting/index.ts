/*
 * @Date: 2024-02-21 11:55:55
 * @LastEditors: phil_litian
 */
import type { GlobalConfig } from '#/config'
import { getAppEnvConfig } from '@u/env'

// 全局设置
export const useGlobalSetting = () => {
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()

  const global: Readonly<GlobalConfig> = {
    title: VITE_GLOB_APP_TITLE
  }

  return global
}

