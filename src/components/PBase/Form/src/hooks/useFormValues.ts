import { ComputedRef, Ref, unref } from "vue"
import { cloneDeep } from 'lodash-es'
import { FormSchema } from "../types/form"
import { isNil } from "@/utils/is";

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable
}

export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel
}: UseFormValuesContext) {
  const handleFormValues = (values: Recordable) => {
    return values
  }

  const initDefault = () => {
    const schemas = unref(getSchema)
    const obj: Recordable = {}

    schemas.map(item => {
      const { defaultValue, field } = item

      if ( !isNil(defaultValue) ) {
        obj[item.field] = defaultValue

        if ( formModel[field] === undefined ) {
          formModel[field] = defaultValue
        }
      }
    })
    defaultValueRef.value = cloneDeep(obj)
  }

  return { handleFormValues, initDefault }
}
