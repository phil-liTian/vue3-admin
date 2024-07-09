/*
 * @Date: 2024-07-03 10:56:28
 * @LastEditors: phil_litian
 */
import type { DebouncedFunc, DebounceSettings } from 'lodash-es'
import { debounce } from 'lodash-es'
import { computed, ref, watchEffect } from "vue";
import { UseRequestPlugin } from "../types";

const useDebouncePlugin: UseRequestPlugin<any, any[]> = ( 
  fetchInstance, 
  { debounceWait, debounceLeading, debounceMaxWait, debounceTrailing } 
) => {
  const debounceRef = ref<DebouncedFunc<any>>()

  const options = computed(() => {
    const ret: DebounceSettings = {}
    if ( debounceWait !== undefined ) {
      ret.debounceWait = debounceWait
    }
    if ( debounceLeading !== undefined ) {
      ret.debounceLeading = debounceLeading
    }
    if ( debounceMaxWait !== undefined ) {
      ret.debounceMaxWait = debounceMaxWait
    }
    if ( debounceTrailing !== undefined ) {
      ret.debounceTrailing = debounceTrailing
    }
    return ret
  })

  watchEffect(() => {
    if ( debounceWait ) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      debounceRef.value = debounce(
        cb => cb(),
        debounceWait,
        options.value
      )

      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debounceRef.value?.(() => {
            _originRunAsync(...args)
            .then(resolve)
            .catch(reject)
          })
        })
      }

      return () => {
        debounceRef.value?.cancel()
        fetchInstance.runAsync = _originRunAsync
      }
    }
  })

  if ( !debounceWait ) return {}

  return {
    onCancel: () => {
      debounceRef.value?.cancel()
    }
  }
}

export default useDebouncePlugin