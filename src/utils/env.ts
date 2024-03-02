/*
 * @Date: 2024-02-23 21:35:27
 * @LastEditors: phil_litian
 */
import { GlobalEnvConfig } from '#/config'

export const getAppEnvConfig = () => {
  
  // 测试环境直接使用env
  // TODO: 生产环境
  const DEV = import.meta.env.DEV ? (import.meta.env as unknown as GlobalEnvConfig) : '' as unknown as GlobalEnvConfig

  const { VITE_GLOB_APP_TITLE } = DEV

  return {
    VITE_GLOB_APP_TITLE
  }
}