/*
 * @Date: 2024-04-17 11:44:10
 * @LastEditors: phil_litian
 */

import { computed, ref, unref } from "vue"


export function useFullScreen() {
  const fullScreenRef = ref(false)
  
  function handleFullScreen() {
    fullScreenRef.value = !unref(fullScreenRef)
  }

  const getWrapClassName = computed(() => {
    return unref(fullScreenRef) ? 'fullscreen-modal' : ''
  })

  return {
    fullScreenRef,
    getWrapClassName,
    handleFullScreen
  }
}

