<template>
  <Col v-bind="colPropsComputed">
    <FormItem v-bind='formItemProps'>
      <template #label v-if="!formItemProps.hideLabel && schema.component !== 'Divider'" >
        <Tooltip>
          <span>{{ schema.label }}</span>

          <template #title v-if="schema.helpMessage">
            {{ schema.helpMessage }}
          </template>
          <PIcon v-if="schema.helpMessage" class="ml-5" icon="solar:question-circle-outline" />
        </Tooltip>
      </template>

      <Divider v-if="schema.component === 'Divider' && schema.label && !formItemProps.hideLabel">{{ schema.label }}</Divider>
      
      <component 
        v-else
        v-bind="{ ...cmpProps }"
        :schema='schema'
        @change="handleChange"
        :is="componentItem">
      </component>
    </FormItem>
  </Col>
</template>
  
<script lang='ts' setup>
  import { FormItem, Divider, Tooltip, Col } from 'ant-design-vue'
  import { computed, PropType } from 'vue'
  import { componentMap } from '../../core/formItemConfig'
  import { IVFormComponent } from '../../typings/v-form-component'
  import { useFormModelState, useFormDesignState } from '../../hooks/useFormDesignState';
  
  defineOptions({ name: 'VFormItem' })
  const emits = defineEmits(['change'])
  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })

  const { formConfig } = useFormDesignState()
  const { formModel, setFormModel } = useFormModelState()

  const componentItem = computed(() => componentMap.get(props.schema.component) )

  const colPropsComputed = computed(() => {
    return props.schema.colProps || {}
  })

  const formItemProps = computed(() => {
    const { itemProps, colProps } = props.schema

    let labelCol = {
      style: { width: `${formConfig.value.labelWidth || 100}px` }
    }

    const newConfig = Object.assign({}, {
      labelCol
    }, itemProps)

    return newConfig
  })

  const cmpProps = computed(() => {
    const { component, field } = props.schema
    const isCheck = props.schema.component && ['Switch', 'Checkbox', 'Radio'].includes(component)
    console.log('formModel', formModel);
    

    return {
      ...props.schema.componentProps,
      [ isCheck ? 'checked' : 'value' ]: formModel.value[field]
    }
  })

  console.log('cmpProps', cmpProps);
  

  const handleChange = (e) => {
    const { component, field } = props.schema
    console.log('e-->', e, field);
    
    const isCheck = ['Switch', 'Checkbox', 'Radio'].includes(component)
    const target = e ? e.target : null
    const value = target ? (isCheck ? target.checked : target.value) : e
    console.log('value', value);
    
    setFormModel(field, value)
    emits('change', value)
  }
</script>
  
<style lang='less' scoped>
  
</style>