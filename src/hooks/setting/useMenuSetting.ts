/*
 * @Date: 2024-03-22 23:34:59
 * @LastEditors: phil_litian
 */

import { MenuModeEnum } from '@/enums/menuEnum'
import { useAppStore } from '@s/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()

export const useMenuSetting = () => {
  

  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  // 菜单模式
  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  // 菜单主题
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)

  // 背景色
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor )

  // 是否垂直
  const getIsHorizontal = computed(() => {
    return getMenuMode.value === MenuModeEnum.HORIZONTAL
  })

  return {
    getAccordion,
    getMenuTheme,
    getMenuBgColor,
    getIsHorizontal
  }
}