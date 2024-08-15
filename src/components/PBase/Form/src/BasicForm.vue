<!--
 * @Date: 2024-04-12 16:24:12
 * @LastEditors: phil_litian
-->
<template>
  <Form
    ref="formElRef"
    :class="getFormClass"
    :model="formModel">
    <Row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem 
          :formModel="formModel"
          :formProps="getProps"
          :formActionType="formActionType"
          :schema="schema"
          :setFormModel="setFormModel"
          :allDefaultValues="defaultValueRef">
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>
      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </Row>
  </Form>
</template>
  
<script lang='ts' setup>
  import type { Ref } from 'vue'
  import { computed, unref, defineEmits, reactive, watch, onMounted, ref } from 'vue';
  import { Form, Row } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { cloneDeep } from 'lodash-es'
  import FormItem from './components/FormItem.vue'
  import FormAction from './components/FormAction.vue'
  import { basicProps } from './props'
  import { useFormEvents } from './hooks/useFormEvents'
  import { createFormContext } from './hooks/useFormContext'
  import { useFormValues } from './hooks/useFormValues';
  import { useAdvanced } from './hooks/useAdvanced'
  import { FormActionType, FormProps, FormSchema } from './types/form'
  import { deepMerge } from '@/utils';
  import { AdvanceState } from './types/hooks';

  defineOptions({ name: 'PBasicForm' })
  const props = defineProps(basicProps)
  const emits = defineEmits(['submit', 'reset', 'register'])
  const defaultValueRef = ref({})
  const formModel = reactive({})
  const advancedState = reactive<AdvanceState>({
    isAdvanced: false
  })
  const propsRef = ref<Partial<FormProps>>({})
  const schemaRef = ref<Nullable<FormSchema[]>>(null)
  const formElRef: Ref<Nullable<FormActionType>> = ref(null)

  const { prefixCls } = useDesign('basic-form')
  
  const getProps = computed(() => { return { ...props, ...unref(propsRef) } })

  const getRow = computed(() => {
    const { rowProps } = unref(getProps)

    return {
      ...rowProps
    }
  })

  const getSchema = computed(() => {
    const schemas = schemaRef.value || unref(getProps).schemas;

    return cloneDeep(schemas)
  })

  const { handleFormValues, initDefault } = useFormValues({
    defaultValueRef,
    getSchema,
    formModel
  })

  const { 
    handleSubmit, 
    resetFields, 
    setFieldsValue,
    getFieldsValue,
    appendSchemaByField,
    removeSchemaByField,
    validateFields,
    clearValidate,
    updateSchema } = useFormEvents({
    emits,
    defaultValueRef,
    formElRef,
    getSchema,
    formModel,
    schemaRef,
    handleFormValues
  })

  const { handleToggleAdvanced } = useAdvanced({
    advancedState,
    getProps,
    getSchema
  })

  const setProps = async (formProps: FormProps) => {
    propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
  }

  const setFormModel = (key, value) => {
    // formModel.value = { ...formModel.value, ...values }
    formModel[key] = value
  }

  watch(() => getSchema.value, (schema) => {
    if ( schema.length ) {
      initDefault()
    }
  })

  createFormContext({
    submitAction: handleSubmit,
    resetAction: resetFields
  })
  
  const getFormClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--compact`]: unref(getProps).compact
      }
    ]
  })

  const formActionType: FormActionType = {
    setProps,
    submit: handleSubmit,
    setFieldsValue,
    getFieldsValue,
    resetFields,
    appendSchemaByField,
    removeSchemaByField,
    validateFields,
    clearValidate,
    updateSchema
  }
  
  const getFormActionBindProps = computed(() => {
    return { ...getProps.value, ...advancedState  }
  })
  
  defineExpose({
    ...formActionType
  })

  onMounted(() => {
    initDefault()
    emits('register', formActionType)
  })
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-form';

  .@{prefix-cls} {
    &--compact {
      .ant-form-item {
        margin-bottom: 8px !important;
      }
    }

    .ant-form-item {

      &-label {
        label {
          &::after {
            margin: 0 6px 0 2px;
          }
        }
      }

      &.suffix-item {
        .suffix {
          display: inline-flex;
          align-items: center;
          margin-top: 1px;
          padding-left: 6px;
          line-height: 1;
        }
      }
    }
  }
</style>