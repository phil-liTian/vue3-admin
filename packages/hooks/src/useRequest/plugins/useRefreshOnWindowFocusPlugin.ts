/*
 * @Date: 2024-07-19 15:23:22
 * @LastEditors: phil_litian
 */
import { watchEffect, ref, onUnmounted } from "vue";
import { UseRequestPlugin } from "../types";
import { limit } from '../utils/limit'
import subscribeFocus from '../utils/subscribeFocus'

const useRefreshOnWindowFocusPlugin: UseRequestPlugin<any, any[]> = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 }
) => {
  const unsubscribeRef = ref<() => void>()
  
  const stopSubscribe = () => {
    unsubscribeRef.value?.()
  }

  watchEffect(() => {
    if ( refreshOnWindowFocus ) {
      const limitRefresh = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan)
      unsubscribeRef.value = subscribeFocus(() => limitRefresh())
    }

    return () => {
      stopSubscribe()
    }
  })

  onUnmounted(() => {
    stopSubscribe()
  })

  return {

  }
}

export default useRefreshOnWindowFocusPlugin
