/*
 * @Date: 2024-04-10 14:43:44
 * @LastEditors: phil_litian
 */
import { useAppStore } from '@s/modules/app'
import { computed } from 'vue'

export function useTransitionSetting() {
  const appStore = useAppStore() 

  const getOpenNProgress = computed(() => appStore.getTransitionSetting.openNProgress)
  const getOpenPageLoading = computed(() => appStore.getTransitionSetting.openPageLoading)
  const getEnableTransition = computed(() => appStore.getTransitionSetting.enable)
  const getBasicTransition = computed(() => appStore.getTransitionSetting.basicTransition)

  return {
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition
  }
}
