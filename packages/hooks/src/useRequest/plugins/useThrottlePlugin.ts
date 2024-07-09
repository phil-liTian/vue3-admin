import type { ThrottleSettings, DebouncedFunc } from 'lodash-es'
import { throttle } from 'lodash-es'
import { UseRequestPlugin } from "../types"
import { ref, watchEffect } from 'vue'


const useThrottlePlugin: UseRequestPlugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing }
) => {
  const throttleRef = ref<DebouncedFunc>()

  let ret: ThrottleSettings = {}

  if ( throttleTrailing !== undefined ) {
    ret.throttleTrailing = throttleTrailing
  }

  if ( throttleLeading !== undefined ) {
    ret.throttleLeading = throttleLeading
  }

  if ( !throttleWait ) {
    return {}
  }

  watchEffect(() => {
    if ( throttleWait ) {
      const _originalRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      throttleRef.value = throttle(cb => cb(), throttleWait, ret)

      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          throttleRef.value?.(() => {
            _originalRunAsync(...args)
            .then(resolve)
            .catch(reject)
          })
        })
      }

      // 清理函数：
      // 主要作用是在 watchEffect 的依赖发生变化，导致当前的副作用函数（即 if 语句块内的代码）重新执行之前，执行一些清理操作，
      // 以避免产生不必要的副作用或者资源泄漏。
      // 可确保在下次副作用重新执行时，系统处于一个干净和正确的初始状态
      return () => {
        fetchInstance.runAsync = _originalRunAsync
        throttleRef.value?.cancel?.()
      }
    }
  })

  return {
    onCancel: () => {
      throttleRef.value?.cancel?.()
    }
  }
}

export default useThrottlePlugin