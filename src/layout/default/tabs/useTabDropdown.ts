/*
 * @Date: 2024-04-02 20:11:38
 * @LastEditors: phil_litian
 */

import { computed } from "vue"
import { useI18n } from '@h/web/useI18n'
import { MenuEventEnum } from './typing'


export function useTabDropdown() {

  const { t } = useI18n('layout')

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
      }
    ]
  })

  return { getDropMenuList }
}