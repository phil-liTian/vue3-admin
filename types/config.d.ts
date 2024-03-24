/*
 * @Date: 2024-02-21 11:06:43
 * @LastEditors: phil_litian
 */
import { PermissionModeEnum } from '@e/appEnum'

// 支持的语言配置
export type LocalType = 'en' | 'zh-CN'

export interface GlobalEnvConfig {
  VITE_GLOB_APP_TITLE: string,
  VITE_GLOB_API_URL_PREFIX: string,
  VITE_GLOB_API_URL: string
}

export interface GlobalConfig {
  title: string,
  urlPrefix: string,
  apiUrl: string
}

// locale返回的类型
export interface LocalSetting {
  locale: LocalType,
  fallback: LocalType
}

interface MenuSetting {
  accordion: boolean // 菜单是否打开手风琴模式
}

export interface ProjectConfig {
  permissionMode: PermissionModeEnum,

  menuSetting: MenuSetting
}

