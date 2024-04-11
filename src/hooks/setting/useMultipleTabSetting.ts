/*
 * @Date: 2024-04-10 11:49:09
 * @LastEditors: phil_litian
 */
import { useAppStore } from '@s/modules/app'
import { computed } from 'vue'

export const useMultipleTabSetting = () => {
  const appStore = useAppStore()

  const getShowMultipleTab = computed(() => appStore.getMultipleSetting.show)

  const getShowFold = computed(() => appStore.getMultipleSetting.showFold)

  const getShowQuick = computed(() => appStore.getMultipleSetting.showQuick)

  const getShowRedo = computed(() => appStore.getMultipleSetting.showRedo)
  
  return {
    getShowMultipleTab,
    getShowFold,
    getShowQuick,
    getShowRedo
  }
}