/*
 * @Date: 2024-03-22 23:34:59
 * @LastEditors: phil_litian
 */
import { SIDER_BAR_MINI_WIDTH, SIDER_BAR_SHOW_TITLE_MINI_WIDTH } from '@e/appEnum'
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

  // 菜单宽度
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  // 最小宽度(菜单折叠时的宽度)
  const getMiniWidthNumber = computed(() => {
    return SIDER_BAR_SHOW_TITLE_MINI_WIDTH
  })

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
    getMenuWidth,
    getMiniWidthNumber,
    getShowMenu,
    getMenuBgColor,
    getIsHorizontal,
    getCollapsed,
    setMenuSetting,
    toggleCollpased
  }
}