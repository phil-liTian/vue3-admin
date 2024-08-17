
import { computed, getCurrentInstance, reactive } from 'vue'
import { isEqual } from 'lodash-es'
export function useRuleFormItem({
  props,
  key = 'value',
  changeEvent = 'change'
}) {
  const instance = getCurrentInstance()

  const innerState = reactive({
    value: props[key]
  })

  const state = computed({
    get() {
      return innerState.value
    },
    set(val) {
      if ( isEqual(val, innerState.value) ) return
      innerState.value = val
    }
  })
  
  return [ state ]
}