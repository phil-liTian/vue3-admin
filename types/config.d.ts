/*
 * @Date: 2024-02-21 11:06:43
 * @LastEditors: phil_litian
 */
import { RouterTransitionEnum, ThemeEnum } from '@/enums/appEnum'
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
  accordion: boolean, // 侧边菜单是否打开手风琴模式
  mode: MenuModeEnum, // 菜单模式（方向）
  type: MenuTypeEnum, // 位置 混合模式
  theme: ThemeEnum,
  collapsed: boolean,
  menuWidth: number,
  split: boolean,
  collapsedShowTitle: boolean
}

export interface HeaderSetting {
  show: boolean,
  showSearch: boolean
}

export interface MultiTabsSetting {
  show: boolean,
  cache: boolean,
  showQuick: boolean,
  showFold: boolean,
  showRedo: boolean
}

export interface TransitionSetting {
  enable: boolean,
  openNProgress: boolean,
  openPageLoading: boolean,
  basicTransition: RouterTransitionEnum
}

export interface ProjectConfig {
  permissionMode: PermissionModeEnum,
  menuSetting: MenuSetting, // menu设置
  headerSetting: HeaderSetting, // header设置
  multiTabsSetting: MultiTabsSetting, // tab设置
  transitionSetting: TransitionSetting,
  permissionCacheType: CacheTypeEnum,

  showBreadCrumb: boolean, // 是否展示面包屑导航
  showBreadCrumbIcon: boolean, // 是否展示面包屑导航的icon
  showFooter: boolean, // 展示页脚内容
  fullContent: boolean, // 全屏
  grayMode: boolean, // 灰色模式
  colorWeak: boolean, // 色弱模式
  showLogo: boolean // 展示logo
}

