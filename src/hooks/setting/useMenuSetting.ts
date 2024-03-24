/*
 * @Date: 2024-03-22 23:34:59
 * @LastEditors: phil_litian
 */

import { useAppStore } from '@s/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()

export const useMenuSetting = () => {
  

  const getAccordion = computed(() => appStore.getMenuSetting.accordion)



  return {
    getAccordion
  }
}