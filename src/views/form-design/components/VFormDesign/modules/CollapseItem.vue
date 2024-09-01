<template>
  <div :class="prefixCls">
    <draggable
      tag="ul"
      itemKey="type"
      v-bind="{

        group: { name: 'form-draggable', pull: 'clone', put: false },
        handle: '.drag-move',
        animation: 180,
        clone: cloneItem
      }"
      :model-value="list"
      @add="handleAdd">
      <template #item="{ element, index }">
        <li 
          @click="$emit('handle-list-push', element)"
          class="text-ellipsis drag-move">
          <PIcon :icon="element.icon"></PIcon>
          {{ element.label }}
        </li>
      </template>
    </draggable>
  </div>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue';
  import draggable from 'vuedraggable';
  import { useDesign } from '@h/web/useDesign';
  import { IVFormComponent } from '../../../typings/v-form-component';
  defineOptions({ name: 'CollapseItem' })
  const props = defineProps({
    list: {
      type: Array as PropType<IVFormComponent[]>,
      default: () => []
    },
    listDragPush: {
      type: Function,
      default: null
    }
  })
  const emits = defineEmits(['handle-list-push'])
  const { prefixCls } = useDesign('form-design-collapse-item')
  const handleAdd = () => {
    console.log('handleAdd')
  }

  const cloneItem = (one) => {
    // 不能使用当前方法，需要拖动到指定位置 需要想别的方法
    // emits('handle-list-push', one)
    // 注: 这里需要return处理后的数据结构
    return props.listDragPush && props.listDragPush(one)
  }
</script>
  
<style lang='less'>
  @prefixCls: ~'@{namespace}-form-design-collapse-item';

  .@{prefixCls} {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      list-style: none;

      li {
        height: 36px;
        width: calc(50% - 6px);
        border: 1px solid @border-color-base;
        border-radius: 4px;
        line-height: 20px;
        margin: 2.7px;
        padding: 8px 12px;
        cursor: move;

        &:hover {
          position: relative;
          border: 1px solid @primary-color;
          box-shadow: 0 2px 6px @primary-color;
          color: @primary-color;
        }
      }
    }
  }
</style>