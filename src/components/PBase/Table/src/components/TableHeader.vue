<!--
 * @Date: 2024-05-07 10:21:25
 * @LastEditors: phil_litian
-->
<template>
  <div :style="{ width: '100%' }">
    <div v-if="$slots.headerTop">
      <slot name="headerTop"></slot>
    </div>

    <div v-if="showSelectionBar">
      <TableSelectionBar :count="props.count" />
    </div>

    <div class="flex">
      <TableTitle 
        :title="title"
        :helpMessage="titleHelpMessage" />

      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <Divider type="vertical" v-if="$slots.toolbar && showTableSetting" /> 
        <TableSetting v-if="showTableSetting" />
      </div>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { PropType } from 'vue'
  import { Divider } from 'ant-design-vue'
  import TableSetting from './settings/index.vue'
  import TableTitle from './TableTitle.vue'
  import TableSelectionBar from './TableSelectionBar.vue'
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@/utils/propTypes'
  const props = defineProps({
    showTableSetting: propTypes.bool.def(false),
    title: {
      type: [String, Function] as PropType<string | ((data) => string)>
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    showSelectionBar: propTypes.bool.def(true),
    count: propTypes.number.def(0)
  })

  const { prefixCls } = useDesign('basic-table-header')
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-table-header';

  .@{prefix-cls} {
    &__toolbar {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      > * {
        margin-right: 8px;
      }
    }
  }
</style>