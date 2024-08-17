import { shallowReactive, unref, watch } from 'vue'
import { AdvanceState } from "../types/hooks"
import { FormProps, FormSchema } from '../types/form'
import { isBoolean } from '@/utils/is'
import { ColEx } from '../types'
import { useBreakPoint } from '@/hooks/event/useBreakPoint'
// 每个col的宽度 不传默认整行展示
const BASIC_COL_LEN = 24
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
  // [key: string]: Boolean 
  // 用于标识哪个field展示
  const fieldsIsAdvancedMap = shallowReactive({})
  watch(() => advancedState.isAdvanced, () => {
    if ( unref(getProps).showAdvancedButton ) {
      updateAdvanced()
    }
  }, { immediate: true })

  function getAdvanced(itemCol: Partial<ColEx>, itemColSum: number = 0 ) {
    // realWidthRef 真是宽度
    // screenEnum 屏幕枚举
    // screenRef 屏幕尺寸
    // const { realWidthRef, screenEnum, screenRef } = useBreakPoint()
    // const width = unref(realWidthRef)
    // const mdWidth = BASIC_COL_LEN

    itemColSum += itemCol.span || BASIC_COL_LEN

    if ( itemColSum > BASIC_COL_LEN * (unref(getProps).alwaysShowLines || 1)  ) {
      return { isAdvanced: advancedState.isAdvanced, itemColSum }
    } else {
      // 第一行是稳定展示的
      return { itemColSum, isAdvanced: true }
    }
  }

  function updateAdvanced() {
    // 每行field的个数
    let itemColSum = 0
    const { baseColProps } = unref(getProps)
    const schemas = unref(getSchema)
    
    for (const schema of schemas) {
      const { show, colProps } = schema
      let isShow = true
      if ( isBoolean(show) ) {
        isShow = show
      }

      if( isShow && (colProps || baseColProps) )  {
        // isAdvanced 为 true则展示
        const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)
        
        itemColSum = sum || 0
        fieldsIsAdvancedMap[schema.field] = isAdvanced
      }
    }
  }

  function handleToggleAdvanced() {
    advancedState.isAdvanced = !advancedState.isAdvanced
  }

  return {
    handleToggleAdvanced,
    fieldsIsAdvancedMap
  }
}
