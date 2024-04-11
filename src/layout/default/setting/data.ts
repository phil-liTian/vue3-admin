/*
 * @Date: 2024-04-10 13:24:57
 * @LastEditors: phil_litian
 */
import { HandlerEnums } from "./enums";
import { useRootSetting } from '@h/setting/useRootSetting'
import { useMultipleTabSetting } from "@/hooks/setting/useMultipleTabSetting";
import { useTransitionSetting } from '@h/setting/useTransitionSetting'
import { useMenuSetting } from '@h/setting/useMenuSetting'
import { useHeaderSetting } from '@h/setting/useHeaderSetting'
import { ComputedRef } from "vue";
const { getShowBreadcrumb, getShowBreadcrumbIcon, getShowFooter, getFullContent, getGrayMode, getColorWeak, getShowLogo } = useRootSetting()
const { getShowMultipleTab, getShowFold, getShowQuick, getShowRedo } = useMultipleTabSetting()
const { getOpenNProgress, getOpenPageLoading, getEnableTransition } = useTransitionSetting()
const { getSplit, getCollapsed, getShowMenu, getAccordion } = useMenuSetting()
const { getShowSearch, getShowHeader } = useHeaderSetting()

interface DataItem {
  title: string,
  event: HandlerEnums,
  value: ComputedRef<boolean>
}

// 界面内容
export const contentDataList: DataItem[] = [
  { title: 'setting.breadcrumb', event: HandlerEnums.SHOW_BREADCRUMB, value: getShowBreadcrumb },
  { title: 'setting.breadcrumbIcon', event: HandlerEnums.SHOW_BREADCRUMB_ICON, value: getShowBreadcrumbIcon },
  { title: 'setting.tabs', event: HandlerEnums.TABS_SHOW, value: getShowMultipleTab },
  { title: 'setting.tabsRedoBtn', event: HandlerEnums.TABS_SHOW_REDO, value: getShowRedo },
  { title: 'setting.tabsQuickBtn', event: HandlerEnums.TABS_SHOW_QUICK, value: getShowQuick },
  { title: 'setting.tabsFoldBtn', event: HandlerEnums.TABS_SHOW_FOLD, value: getShowFold },
  { title: 'setting.sidebar', event: HandlerEnums.MENU_SHOW_SIDEBAR, value: getShowMenu },
  { title: 'setting.header', event: HandlerEnums.HEADER_SHOW, value: getShowHeader },
  { title: 'setting.logo', event: HandlerEnums.LOGO_SHOW, value: getShowLogo },
  { title: 'setting.footer', event: HandlerEnums.FOOTER_SHOW, value: getShowFooter },
  { title: 'setting.fullContent', event: HandlerEnums.FULL_CONTENT, value: getFullContent },
  { title: 'setting.grayMode', event: HandlerEnums.GRAY_MODE, value: getGrayMode },
  { title: 'setting.colorWeak', event: HandlerEnums.COLOR_WEAK, value: getColorWeak },
]

// 界面功能
export const featureDataList: DataItem[] = [
  { title: 'setting.splitMenu', event: HandlerEnums.MENU_SPLIT, value: getSplit },
  { title: 'setting.menuCollapse', event: HandlerEnums.MENU_COLLAPSED, value: getCollapsed },
  { title: 'setting.menuSearch', event: HandlerEnums.HEADER_SHOW_SEARCH, value: getShowSearch },
  { title: 'setting.closeMixSidebarOnChange', event: HandlerEnums.HEADER_SHOW_SEARCH, value: getShowSearch },
  { title: 'setting.menuAccordion', event: HandlerEnums.MENU_ACCORDION, value: getAccordion },
]

// 动画内容
export const transitionDataList: DataItem[] = [
  { title: 'setting.progress', event: HandlerEnums.OPEN_PROGRESS, value: getOpenNProgress },
  { title: 'setting.switchLoading', event: HandlerEnums.OPEN_PAGE_LOADING, value: getOpenPageLoading },
  { title: 'setting.switchAnimation', event: HandlerEnums.OPEN_ROUTE_TRANSITION, value: getEnableTransition },
]
