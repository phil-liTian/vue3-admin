/*
 * @Date: 2024-07-19 10:40:14
 * @LastEditors: phil_litian
 */
// loadingDelay时间后;loading才变成true 防止闪烁
import { ref, unref } from "vue"
import { UseRequestPlugin, UseRequestTimeout } from "../types"

const useLoadingDelayPlugin: UseRequestPlugin<any, any[]>  = ( fetchInstance, { loadingDelay, ready } ) => {
  const timeRef = ref<UseRequestTimeout>()

  if ( !loadingDelay ) {
    return {}
  }
  const cancelTimeout = () => {
    if ( timeRef.value ) {
      clearTimeout(timeRef.value)
    }
  }

  return {
    onBefore() {
      cancelTimeout()

      if ( unref(ready) !== false ) {
        timeRef.value = setTimeout(() => {
          fetchInstance.setState({ loading: true })
        }, loadingDelay);
      }

      return { loading: false }
    },

    onFinally() {
      cancelTimeout()
    },

    onCancel() {
      cancelTimeout()
    }
  }
}


export default useLoadingDelayPlugin
