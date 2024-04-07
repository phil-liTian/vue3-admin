/*
 * @Date: 2024-03-22 23:34:59
 * @LastEditors: phil_litian
 */

import { MenuSetting } from '#/config'
import { MenuModeEnum } from '@/enums/menuEnum'
import { useAppStore } from '@s/modules/app'
import { computed, unref } from 'vue'

const appStore = useAppStore()

export const useMenuSetting = () => {
  

  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  // 菜单模式
  const getMenuMode = computed(() => appStore.getMenuSetting.mode)
  
  // 菜单位置
  const getMenuType = computed(() => appStore.getMenuSetting.type)

  // 菜单主题
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)

  // 背景色
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor )

  // 是否垂直
  const getIsHorizontal = computed(() => {
    return getMenuMode.value === MenuModeEnum.HORIZONTAL
  })

  // 是否展示Menu
  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  // 是否折叠
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  function setMenuSetting(menuSetting: Partial<MenuSetting>) {
    appStore.setMenuSetting(menuSetting)
  }

  // 切换菜单是否收起状态
  const toggleCollpased = () => {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }

  return {
    getAccordion,
    getMenuTheme,
    getMenuType,
    getShowMenu,
    getMenuBgColor,
    getIsHorizontal,
    getCollapsed,
    setMenuSetting,
    toggleCollpased
  }
}