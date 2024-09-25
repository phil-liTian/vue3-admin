/*
 * @Date: 2024-07-10 20:22:32
 * @LastEditors: phil_litian
 */
import { effect, ref, watch } from "vue"
import { UseRequestPlugin } from "../types"
import { isDocumentVisible } from "../utils/isDocumentVisible"
import subscribeRevisible from "../utils/subscribeRevisible"


const usePollingPlugin: UseRequestPlugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 }
) => {
  const timerRef = ref()
  const unsubscribeRef = ref<() => void>()
  const countRef = ref<number>(0)
  const stopPolling = () => {
    if ( timerRef.value ) {
      clearTimeout(timerRef.value)
    }
  }

  watch(() => pollingInterval, () => {
    if ( !pollingInterval ) {

    }
  })

  // pollingInterval参数开启轮询逻辑
  if ( !pollingInterval ) return {}

  return {
    onBefore: () => {
      stopPolling()
    },
    onError: () => {
      countRef.value++
    },
    onSuccess: () => {
      countRef.value = 0
    },
    onFinally() {
      // 不限制次数 或者限制次数且当前请求次数小于限制的次数 则轮询
      if ( pollingErrorRetryCount === -1 || (pollingErrorRetryCount !== -1 && countRef.value < pollingErrorRetryCount ) ) {
        timerRef.value = setTimeout(() => {
          // 隐藏时不轮询 并且页面隐藏
          if ( !pollingWhenHidden && !isDocumentVisible() ) {
            unsubscribeRef.value = subscribeRevisible(() => {
              fetchInstance.refresh()
            })
          } else {
            fetchInstance.refresh()
          }

        }, pollingInterval);
      } else {
        countRef.value = 0
      }
    },

    onCancel() {
      stopPolling()
    }
  }
}

export default usePollingPlugin
