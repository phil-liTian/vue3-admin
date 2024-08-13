/*
 * @Date: 2024-08-13 19:17:12
 * @LastEditors: phil_litian
 */
import { ComputedRef, Ref, unref } from "vue";
import { FormSchema } from "../types/form";

interface UseFormActionContext {
  emits: EmitType,
  handleFormValues: Fn,
  formElRef: Ref<any>,
  formModel: Recordable,
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>
}

function getDefaultValue(schema: FormSchema, defaultValueRef: any, key: string) {

}


export function useFormEvents({
  emits,
  formElRef,
  formModel,
  getSchema,
  defaultValueRef,
  handleFormValues
}: UseFormActionContext) {

  // 获取所有的fileds
  const getAllFields = () => {
    return unref(getSchema).map(v => v.field)
  }

  const validate = async (nameList?: false ) => {
    let _nameList: any = [];
    if ( nameList === undefined ) {
      _nameList = getAllFields()
    } else {

    }

    const values = await unref(formElRef)?.validate(_nameList)
    return handleFormValues(values)
  }

  const handleSubmit = async (e?: Event): Promise<void> => {
    e && e.preventDefault()
    const formEl = unref(formElRef)
    if ( !formEl ) return
    try {
      const value = await validate()
      emits('submit', value)
    } catch(error) {
      console.log('error', error);
    }
    console.log('handleSubmit');
  }

  const resetFields = async (): Promise<void> => {
    const formEl = unref(formElRef)
    if ( !formEl ) return
    Object.keys(formModel).forEach(key => {
      formModel
    })
  }

  // 设置form中的field值
  const setFieldsValue = async (values: Recordable) => {
    console.log('values--->', values);
  }

  return {
    handleSubmit,
    resetFields,
    setFieldsValue
  }
}
