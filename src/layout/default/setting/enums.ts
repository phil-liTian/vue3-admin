/*
 * @Date: 2024-03-28 19:42:06
 * @LastEditors: phil_litian
 */

import { useI18n } from '@h/web/useI18n'
import { MenuModeEnum, MenuTypeEnum } from "@/enums/menuEnum";
import { RouterTransitionEnum } from '@e/appEnum'

const { t } = useI18n('layout') 
export enum HandlerEnums {
  // menu
  MENU_THEME = 1,
  MENU_COLLAPSED,
  MENU_SPLIT,
  MENU_SHOW_SIDEBAR,
  MENU_ACCORDION,

  // 全局性的配置
  LOGO_SHOW,
  HEADER_SHOW_SEARCH,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  HEADER_SHOW,
  FOOTER_SHOW,
  FULL_CONTENT,
  GRAY_MODE,
  COLOR_WEAK,


  // tabs
  TABS_SHOW,
  TABS_SHOW_REDO,
  TABS_SHOW_QUICK,
  TABS_SHOW_FOLD,
  
  // transition
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION
}

export const menuTypeListEnum = [
  {
    title: t('setting.menuTypeSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: t('setting.menuTypeMixSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR
  },
  {
    title: t('setting.menuTypeTopMenu'),
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.TOP_MENU
  },
  {
    title: t('setting.menuTypeMix'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX
  }
]

export const routerTransitionOptions = [
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.ZOOM_FADE
].map(item => {
  return {
    label: item,
    key: item
  }
})
