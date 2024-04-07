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
  const handleAction = async (action: MenuEventEnum) => {
    switch(action) {
      case MenuEventEnum.REFRESH_PAGE: {
        await tabStore.refreshPage()
        break
      }
    }
  }

  return {
    refreshPage: () => handleAction(MenuEventEnum.REFRESH_PAGE)
  }
}
