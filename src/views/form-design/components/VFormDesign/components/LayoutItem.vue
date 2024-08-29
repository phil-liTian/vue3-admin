<template>
  <Col v-bind="colPropsComputed">
    <!-- 栅格 -->
    <template v-if="['Grid'].includes(schema.component)">
      <div :class="['grid-box', { 'active': schema.key === formConfig.currentItem.key }]"
        @click='handleSetSelectItem(schema)'>
        <Row class='grid-row'>
          <Col class='grid-col' 
            v-for="(colItem, index) in schema.columns" 
            :key="index" 
            :span="colItem.span">
            <draggable 
              v-bind="{
                group: 'form-draggable',
                handle: '.drag-move',
                animation: 180
              }"
              item-key="key"
              v-model="colItem.children"
              class='draggable-box'>
              <template #item="{ element }">
                 <LayoutItem 
                  class="drag-move"
                  :schema="element" />
              </template>
            </draggable>
          </Col>
        </Row>
        
        <FormNodeOperate 
          :current-item="formConfig.currentItem" />
      </div>
    </template>

    <FormNode
      v-else
      :schema='schema' />
  </Col>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from 'vue'
  import draggable from 'vuedraggable'
  import { Col, Row } from 'ant-design-vue'
  import FormNode from './FormNode.vue';
  import FormNodeOperate from './FormNodeOperate.vue';
  import { IVFormComponent } from '../../../typings/v-form-component'
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
  defineOptions({ name: 'LayoutItem' })
  const props = defineProps({
    schema: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    },
    currentItem: {
      type: Object as PropType<IVFormComponent>,
      default: () => ({})
    }
  })
  const { formConfig, formDesignMethods: { handleSetSelectItem } } = useFormDesignState()
  console.log('formConfig', formConfig);
  

  const colPropsComputed = computed(() => {
    return props.schema.colProps || {}
  })
</script>
  
<style lang='less'>
  
</style>