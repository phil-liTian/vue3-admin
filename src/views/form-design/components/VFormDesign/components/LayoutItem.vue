<template>
  <Col>
    <!-- 栅格 -->
    <template v-if="['Grid'].includes(schema.component)">
      <div :class="['grid-box', { 'active': schema.key === formConfig.currentItem.key }]"
        @click='handleSetSelectItem(schema)'>
        <Row class='grid-row'>
          <Col class='grid-col'>
            <draggable class='draggable-box'>
              <template #item="{ element }">
                <div>{{ element }}</div>
              </template>
            </draggable>
          </Col>
        </Row>
      </div>
    </template>

    <FormNode
      v-else
      :schema='schema' />
  </Col>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue'
  import draggable from 'vuedraggable'
  import { Col, Row } from 'ant-design-vue'
  import FormNode from './FormNode.vue';
  import { IVFormComponent } from '../../../typings/v-form-component'
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
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
</script>
  
<style lang='less'>
  
</style>