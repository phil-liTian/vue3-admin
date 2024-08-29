<template>
  <template v-if="['Grid'].includes(schema.component)">
    <Row>
      <Col 
        v-for="(col, index) in schema.columns" 
        :key="index"
        :span="col.span">
        <FormRender 
          v-for="(item, index) in col.children" 
          :key="index" 
          :schema="item" />
      </Col>
    </Row>
  </template>
  <VFormItem
    v-else
    :schema="schema">

  </VFormItem>
</template>
  
<script lang='ts' setup>
  import { Row, Col } from 'ant-design-vue'
  import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
  import { PropType } from 'vue';
  import VFormItem from '../../VFormItem/index.vue'
  defineOptions({ name: 'FormRender' })

  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>