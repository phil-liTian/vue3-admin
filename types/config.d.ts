/*
 * @Date: 2024-02-21 11:06:43
 * @LastEditors: phil_litian
 */
import { ThemeEnum } from '@/enums/appEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { MenuModeEnum } from '@/enums/menuEnum'
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
  bgColor: string,
  accordion: boolean, // 菜单是否打开手风琴模式
  mode: MenuModeEnum, // 菜单模式
  theme: ThemeEnum
}

export interface ProjectConfig {
  permissionMode: PermissionModeEnum,
  menuSetting: MenuSetting
  permissionCacheType: CacheTypeEnum
}

