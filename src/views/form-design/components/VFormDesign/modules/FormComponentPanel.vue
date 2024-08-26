<template>
  <div class='form-panel v-form-container'>
    <Empty v-show='!formConfig.schemas.length' class='empty-text' description='从左侧选择控件添加' />

    <Form v-bind='formConfig'>
      <div class='draggable-box'>
        <draggable
          class='list-main'
          itemKey='key'
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
  import draggable from 'vuedraggable';
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
  import LayoutItem from '../components/LayoutItem.vue';
  defineOptions({ name: 'FormComponentPanel' })
  
  const { formConfig } = useFormDesignState()
</script>
  
<style lang='less'>
  @import url('../style/variable.less');
  @import url('../style/drag.less');
  .v-form-container {

  }

  .form-panel {
    position: relative;
    height: calc(100% - @operating-area-height);
    .empty-text {
      position: absolute;
      margin: auto;
      height: 150px;
      color: #aaa;
      inset: -10% 0 0;
    }

    .draggable-box {
      .drag-move {
        cursor: move;
      }
    }
  }
</style>