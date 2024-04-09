/*
 * @Date: 2024-04-03 16:13:34
 * @LastEditors: phil_litian
 */
import { useRouter } from 'vue-router'
import { useTabs as useTabsStore } from '@/store/modules/tabs'
import { MenuEventEnum } from '@/layout/default/tabs/typing'

export function useTabs() {
  const router = useRouter()
  const tabStore = useTabsStore()
  const { currentRoute } = router

  function getCurrentTab() {
    const { getTabList } = tabStore
    return getTabList.find(v => v.fullPath === currentRoute.value.fullPath)
  }

  const handleAction = async (action: MenuEventEnum) => {

    const currentTab = getCurrentTab()
    switch(action) {
      case MenuEventEnum.REFRESH_PAGE: {
        await tabStore.refreshPage(router)
        break
      }
      case MenuEventEnum.CLOSE_LEFT: {
        await tabStore.closeLeftTabs(currentTab, router)
        break
      }
      case MenuEventEnum.CLOSE_RIGHT: {
        await tabStore.closeRightTabs(currentTab, router)
        break
      }
      case MenuEventEnum.CLOSE_ALL: {
        await tabStore.closeAllTab()
        break
      }
      case MenuEventEnum.CLOSE_OTHER: {
        await tabStore.closeOtherTabs(currentTab, router)
        break
      }
      case MenuEventEnum.CLOSE_CURRENT: {
        await tabStore.closeTab(currentTab, router)
        break 
      }
    }
  }

  return {
    refreshPage: () => handleAction(MenuEventEnum.REFRESH_PAGE),
    closeLeft: () => handleAction(MenuEventEnum.CLOSE_LEFT),
    closeRight: () => handleAction(MenuEventEnum.CLOSE_RIGHT),
    closeAll: () => handleAction(MenuEventEnum.CLOSE_ALL),
    closeOther: () => handleAction(MenuEventEnum.CLOSE_OTHER),
    close: () => handleAction(MenuEventEnum.CLOSE_CURRENT)
  }
}
