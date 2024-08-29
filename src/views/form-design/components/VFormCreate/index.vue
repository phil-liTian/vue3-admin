<template>
  <div>
    <Form v-bind="formModelProps" :model="formModel">
      <Row>
        <FormRender 
          :schema="schema"
          v-for="(schema, index) in noHiddenList" :key="schema.key">

        </FormRender>
      </Row>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from 'vue';
  import { Form, Row } from 'ant-design-vue'
  import { omit } from 'lodash-es'
  import FormRender from './components/FormRender.vue';
  import { useFormDesignState } from '../../hooks/useFormDesignState'
  import { IFormConfig } from '../../typings/v-form-component';
  import { IAnyObject } from '../../typings/base-type';
  
  const { formConfig } = useFormDesignState()
  const props = defineProps({
    formConfig: {
      type: Object as PropType<IFormConfig>,
      required: true
    },
    formModel: {
      type: Object as PropType<IAnyObject>,
      default: () => ({})
    }
  })

  const formModelProps = computed(() => {
    return omit(props.formConfig, ['schemas'])
  })


  const noHiddenList = computed(() => {
    return formConfig.value.schemas.filter(item => !item.hidden)
  })
</script>
  
<style lang='less' scoped>
  
</style>