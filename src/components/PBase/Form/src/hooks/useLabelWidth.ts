import { computed, Ref, unref } from "vue"
import { FormProps, FormSchema } from "../types/form"
import { isNumber } from "@/utils/is"

export const useItemLabelWidth = ( schemaItemRef: Ref<FormSchema>, propsRef: Ref<FormProps> ) => {
  
  return computed(() => {
    const schemaItem = unref(schemaItemRef)

    const { labelWidth } = schemaItem

    const { labelWidth: globalLabelWidth } = unref(propsRef)

    let width = labelWidth || globalLabelWidth

    if ( width ) {
      width = isNumber(width) ? `${width}px` : width
    }

    return {
      labelCol: { style: { width } },
      wrapperCol: {
        style: { width: `calc(100% - ${width})` }
      }
    }
  })
}
