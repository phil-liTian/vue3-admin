import { ref } from 'vue'
import { UseRequestPlugin, UseRequestTimeout } from "../types"


const useRetryPlugin: UseRequestPlugin<any, any[]> = (fetchInstance, { retryCount, retryInterval }) => {
  // 运行次数
  const countRef = ref(0)
  const timerRef = ref<UseRequestTimeout>()
  const triggerByRetry = ref(false)

  if ( !retryCount  ) {
    return {}
  }

  return {
    onBefore() {
      
    },

    onError: () => {
      countRef.value++
      if ( retryCount === -1 || countRef.value <= retryCount) {
        const timeout = retryInterval ?? Math.min(1000 * 2, 30000)
        timerRef.value = setTimeout(() => {
          triggerByRetry.value = true
          fetchInstance.refresh()
        }, timeout);
      } else {
        countRef.value = 0
      }
    },

    onCancel() {
      if ( timerRef.value ) {
        clearTimeout(timerRef.value)
      }
    }
  }
}

export default useRetryPlugin