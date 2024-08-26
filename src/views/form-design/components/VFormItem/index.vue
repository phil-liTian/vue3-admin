<template>
  <!-- <div>formItem</div> -->
   <!-- <Col>
   
   </Col> -->
   <FormItem v-bind='formItemProps'>
    <template #label>
      <span>{{ schema.label }}</span>
    </template>
    
     <component 
      v-bind="{ ...cmpProps }"
      :schema='schema'
      :is="componentItem">
    </component>
   </FormItem>
</template>
  
<script lang='ts' setup>
  import { FormItem } from 'ant-design-vue'
  import { computed, PropType } from 'vue'
  import { componentMap } from '../../core/formItemConfig'
  import { IVFormComponent } from '../../typings/v-form-component'
  defineOptions({ name: 'VFormItem' })
  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })

  const componentItem = computed(() => componentMap.get(props.schema.component) )

  const formItemProps = computed(() => {

    let labelCol = {
      style: { width: '120px' }
    }

    return {
      labelCol,
    }
  })

  const cmpProps = computed(() => {
    return {

    }
  })
</script>
  
<style lang='less' scoped>
  
</style>