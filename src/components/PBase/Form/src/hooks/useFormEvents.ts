/*
 * @Date: 2024-08-13 19:17:12
 * @LastEditors: phil_litian
 */
import { ComputedRef, Ref, unref } from "vue";
import { get, cloneDeep } from 'lodash-es'
import { FormSchema } from "../types/form";
import { isArray, isObject } from "@/utils/is";

interface UseFormActionContext {
  emits: EmitType,
  handleFormValues: Fn,
  formElRef: Ref<any>,
  formModel: Recordable,
  defaultValueRef: Ref<any>;
  schemaRef: Ref<FormSchema[]>;
  getSchema: ComputedRef<FormSchema[]>
}

function getDefaultValue(schema: FormSchema, defaultValueRef: any, key: string) {

}

export function useFormEvents({
  emits,
  formElRef,
  formModel,
  getSchema,
  schemaRef,
  defaultValueRef,
  handleFormValues
}: UseFormActionContext) {

  // 获取所有的fileds
  const getAllFields = () => {
    return unref(getSchema).map(v => v.field)
  }

  // 动态添加schema
  const appendSchemaByField = (
    schema: FormSchema | FormSchema[],
    prefixField?: string,
    first?: boolean
  ) => {
    const schemaList = cloneDeep(unref(getSchema))
    const addSchemaIds = Array.isArray(schema) ? schema.map(v => v.field) : [ schema.field ]
    if ( schemaList.find(v => addSchemaIds.includes(v.field)) ) {
      console.warn('存在相同的field')
      return
    }
    const index = schemaList.findIndex(v => v.field === prefixField)
    
    const _schemaList = isObject(schema) ? [ schema as FormSchema ] : (schema as FormSchema[])
    
    if ( index === -1 ) {
      first ? schemaList.unshift(..._schemaList) : schemaList.push(..._schemaList)
    } else {
      // 如果已经存在 则在index后面添加_schemaList
      schemaList.splice(index, 0, ..._schemaList)
    }
    schemaRef.value = schemaList
  }

  function _removeSchemaByFeild(field: string, schemaList: FormSchema[]) {
    const index = schemaList.findIndex(v => v.field === field)

    if ( index !== -1 ) {
      schemaList.splice(index, 1)
      Reflect.deleteProperty(formModel, field)
    }
  }

  const removeSchemaByField = (fields: string | string[]) => {
    const schemaList = cloneDeep(unref(getSchema))
    if ( !fields ) return
    if ( !Array.isArray(fields) ) {
      fields = [ fields ]
    }

    for (const field of fields) {
      _removeSchemaByFeild(field, schemaList)
    }
    schemaRef.value = schemaList
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

  // 校验
  const validateFields = async (nameList?: string | string[]) => {
    const values = await unref(formElRef)?.validateFields(nameList)
    // console.log('unref(formElRef)', await unref(formElRef).validateFields(nameList));
    
    // console.log('values', values);
    
    
    return handleFormValues(values)
  }

  const clearValidate = async (nameList?: string | string[]) => {
    return await unref(formElRef).clearValidate(nameList)
  }

  // 提交
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
  }

  // 重置
  const resetFields = async (): Promise<void> => {
    const formEl = unref(formElRef)
    if ( !formEl ) return
    Object.keys(formModel).forEach(key => {
      formModel[key] = unref(defaultValueRef)[key]
    })
  }

  // 设置form中的field值
  const setFieldsValue = async (values: Recordable) => {
    
    if ( !values || !Reflect.ownKeys(values)?.length ) {
      return
    }
    const fields = getAllFields()
    let validKeys: string[] = []
    
    fields.map(key => {
      formModel[key] = get(values, key)
      validKeys.push(key)
    })

    validateFields(validKeys)
  }

  // 动态更新field中的内容
  const updateSchema = async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
    let updateData: Partial<FormSchema>[] = []
    if ( isObject(data) ) {
      updateData.push(data as Partial<FormSchema>)
    }
    if ( isArray(data) ) {
      updateData = [ ...(data as Partial<FormSchema[]>) ]
    }

    let schemas: FormSchema[] = []
    unref(getSchema).map(val => {
      const updateItem = updateData.find(item => item.field === val.field)
      if ( updateItem ) {
        const newSchemas = { ...val, ...updateItem }
        schemas.push(newSchemas)
      } else {
        schemas.push(val)
      }
    })
    console.log('schemaRef', schemaRef);
    
    schemaRef.value = schemas
  }

  const getFieldsValue = () => {
    const formEl = unref(formElRef)
    if ( !formEl ) return {}
    return handleFormValues(unref(formModel))
  }

  return {
    handleSubmit,
    // tab
    resetFields,
    setFieldsValue,
    getFieldsValue,
    // append
    appendSchemaByField,
    removeSchemaByField,
    // rule
    validateFields,
    clearValidate,

    // dynamic
    updateSchema
  }
}
