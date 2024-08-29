<template>
  <div class='form-panel v-form-container'>
    <Empty v-show='!formConfig.schemas.length' class='empty-text' description='从左侧选择控件添加' />

    <Form v-bind='formConfig'>
      <div class='draggable-box'>
        <draggable
          class='list-main'
          itemKey='key'
          v-bind="{
            group: 'form-draggable',
            handle: '.drag-move',
            animation: 180
          }"
          @end="handleDragEnd"
          @start="handleDragStart"
          v-model='formConfig.schemas'>
          <template #item="{ element, index }">
            <LayoutItem 
              class='drag-move'
              :current-item="formConfig.currentItem"
              :schema='element' />
          </template>
        </draggable>
      </div>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { Empty, Form } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import draggable from 'vuedraggable';
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
  import LayoutItem from '../components/LayoutItem.vue';
  defineOptions({ name: 'FormComponentPanel' })
  const emits = defineEmits(['handleSetSelectItem'])
  const { formConfig } = useFormDesignState()
  

  // 默认选中拖拽的元素
  const handleDragStart = (e: any) => {
    emits('handleSetSelectItem', formConfig.value.schemas[e.oldIndex])
  }

  // 拖拽完成
  const handleDragEnd = ({ newIndex }: any) => {
    formConfig.value.schemas = formConfig.value.schemas || []
    const { schemas } = formConfig.value
    schemas[newIndex] = cloneDeep(schemas[newIndex])

    emits('handleSetSelectItem', schemas[newIndex])
  }
</script>
  
<style lang='less'>
  @import url('../style/variable.less');
  @import url('../style/drag.less');
  .v-form-container {

  }

  .form-panel {
    position: relative;
    height: calc(100% - @operating-area-height);
    overflow: hidden auto;
    .empty-text {
      position: absolute;
      margin: auto;
      height: 150px;
      color: #aaa;
      inset: -10% 0 0;
    }

    .draggable-box {
      // height: calc(100vh - 120px);
      // overflow: auto;
      .drag-move {
        cursor: move;
      }
    }
  }
</style>