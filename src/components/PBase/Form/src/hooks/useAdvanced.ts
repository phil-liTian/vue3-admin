import { unref, watch } from 'vue'
import { AdvanceState } from "../types/hooks"
import { FormProps, FormSchema } from '../types/form'

interface UseAdvancedContext {
  advancedState: AdvanceState,
  getProps: FormProps,
  getSchema: FormSchema[]
}

export function useAdvanced({
  advancedState,
  getProps,
  getSchema
}: UseAdvancedContext) {
  watch(() => advancedState.isAdvanced, () => {
    if ( unref(getProps).showAdvancedButton ) {
      updateAdvanced()
    }
  }, { immediate: true })

  function updateAdvanced() {
    const schemas = unref(getSchema)
    
    for (const schema of schemas) {
      schema.show = advancedState.isAdvanced
    }
    console.log('updateAdvanced');
  }

  function handleToggleAdvanced() {
    advancedState.isAdvanced = !advancedState.isAdvanced
  }

  return {
    handleToggleAdvanced
  }
}
