/*
 * @Date: 2024-02-21 11:06:43
 * @LastEditors: phil_litian
 */
import { ThemeEnum } from '@/enums/appEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
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
  show: boolean,
  bgColor: string,
  accordion: boolean, // 菜单是否打开手风琴模式
  mode: MenuModeEnum, // 菜单模式（方向）
  type: MenuTypeEnum, // 位置 混合模式
  theme: ThemeEnum,
  collapsed: boolean,
  menuWidth: number
}

export interface HeaderSetting {
  show: boolean
}

export interface MultiTabsSetting {
  show: boolean,
  cache: boolean
}

export interface ProjectConfig {
  permissionMode: PermissionModeEnum,
  menuSetting: MenuSetting, // menu设置
  headerSetting: HeaderSetting, // header设置
  multiTabsSetting: MultiTabsSetting, // tab设置
  permissionCacheType: CacheTypeEnum
}

