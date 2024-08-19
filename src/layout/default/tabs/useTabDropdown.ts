/*
 * @Date: 2024-04-02 20:11:38
 * @LastEditors: phil_litian
 */

import { computed } from "vue"
import { useI18n } from '@h/web/useI18n'
import { useTabs } from '@h/web/useTabs'
import { MenuEventEnum } from './typing'
import { DropMenu } from "@/components/DropDown/src/types"


export function useTabDropdown() {

  const { t } = useI18n('layout')
  const { closeLeft, closeRight, closeAll, closeOther, close, refreshPage } = useTabs()

  const getDropMenuList = computed(() => {
    return [
      { 
        icon: 'ion:reload-sharp',
        text: t('multipleTab.reload'), 
        event: MenuEventEnum.REFRESH_PAGE 
      },
      { 
        icon: 'line-md:arrow-close-left',
        text: t('multipleTab.closeLeft'), 
        event: MenuEventEnum.CLOSE_LEFT
      },
      {
        icon: 'clarity:close-line',
        text: t('multipleTab.close'),
        event: MenuEventEnum.CLOSE_CURRENT
      },
      {
        icon: 'line-md:arrow-close-right',
        text: t('multipleTab.closeRight'),
        event: MenuEventEnum.CLOSE_RIGHT
      },
      {
        icon: 'clarity:minus-line',
        text: t('multipleTab.closeAll'),
        event: MenuEventEnum.CLOSE_ALL
      },
      {
        icon: 'clarity:minus-line',
        text: t('multipleTab.closeOther'),
        event: MenuEventEnum.CLOSE_OTHER
      }
    ]
  })

  function handleMenuEvent(menu: DropMenu) {
    const { event } = menu
    switch(event) {
      case MenuEventEnum.CLOSE_LEFT: {
        closeLeft()
        break
      }

      case MenuEventEnum.CLOSE_RIGHT: {
        closeRight()
        break
      }

      case MenuEventEnum.CLOSE_ALL: {
        closeAll()
        break
      }

      case MenuEventEnum.CLOSE_CURRENT: {
        close()
        break
      }

      case MenuEventEnum.CLOSE_OTHER: {
        closeOther()
        break
      }

      case MenuEventEnum.REFRESH_PAGE: {
        refreshPage()
        break
      }
    }
  }

  return { getDropMenuList, handleMenuEvent }
}