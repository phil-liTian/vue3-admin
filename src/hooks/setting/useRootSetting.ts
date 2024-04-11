/*
 * @Date: 2024-02-24 12:06:37
 * @LastEditors: phil_litian
 */
import { computed } from 'vue'
import { useAppStore } from '@s/modules/app'
import { ThemeEnum } from '@/enums/appEnum'

// 基础设置钩子
export const useRootSetting = () => {
  const appStore = useAppStore()
  
  // 获取主题模式
  const getDarkMode = computed(() => appStore.getDarkMode)

  // 设置主题模式
  const setDarkMode = (mode: ThemeEnum) => appStore.setDarkMode(mode)

  // 是否展示面包屑导航
  const getShowBreadcrumb = computed(() => appStore.getProjectConfig.showBreadCrumb)

  // 是否展示面包屑导航前置icon
  const getShowBreadcrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon)

  // 是否展示页脚
  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)

  // 全屏
  const getFullContent = computed(() => appStore.getProjectConfig.fullContent )

  // 灰色模式
  const getGrayMode = computed(() => appStore.projectConfig.grayMode)

  // 色弱模式
  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak)

  // 是否展示logo
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  return {
    getDarkMode,
    setDarkMode,
    getShowLogo,
    getShowFooter,
    getShowBreadcrumb,
    getShowBreadcrumbIcon,
    getFullContent,
    getGrayMode,
    getColorWeak
  }
}