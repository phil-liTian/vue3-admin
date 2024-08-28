<template>
  <div class='operate-area'>
    <div class="left-btn-box">
      <Tooltip v-for="item in toolbarsConfigs" :key="item.title" :title="item.title">
        <a @click="$emit(item.event)">
          <PIcon :size='20' :icon="item.icon" />
        </a>
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='撤销'>
        <a :class="{ disabled: !canUndo }" :disabled="!canUndo" @click="undo">
          <PIcon :size='20' icon='ant-design:undo-outlined' />
        </a>
      </Tooltip>

      <Tooltip title='重做'>
        <a :class="{ disabled: !canUndo }" :disabled="!canRedo" @click="redo">
          <PIcon :size='20' icon='ant-design:redo-outlined' />
        </a>
      </Tooltip>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { IFormConfig } from '@/views/form-design/typings/v-form-component';
  import { UseRefHistoryReturn } from '@vueuse/core'
  import { Divider, Tooltip } from 'ant-design-vue'
  import { inject } from 'vue';
  interface IToolbarConfig {
    title?: string;
    icon?: string;
    type?: string;
    event?: string;
  }

  const toolbarsConfigs: IToolbarConfig[] = [
    // {
    //   title: '预览-支持布局',
    //   type: 'preview',
    //   icon: 'ant-design:chrome-filled',
    //   event: 'handlePreview'
    // },
    {
      title: '预览-不支持布局',
      type: 'preview',
      icon: 'ant-design:chrome-filled',
      event: 'handlePreview2'
    },
    {
      title: '导入JSON',
      type: 'importJson',
      event: 'handleOpenImportJsonModal',
      icon: 'ant-design:import-outlined',
    },
    {
      title: '生成JSON',
      type: 'exportJson',
      event: 'handleOpenJsonModal',
      icon: 'ant-design:export-outlined',
    },
    {
      title: '生成代码',
      type: 'exportCode',
      event: 'handleOpenCodeModal',
      icon: 'ant-design:code-filled',
    },
    {
      title: '清空',
      type: 'reset',
      event: 'handleClearFormItems',
      icon: 'ant-design:clear-outlined',
    },
  ]

  const historyRef = inject('historyReturn')

  const { redo, undo, canRedo, canUndo } = historyRef as UseRefHistoryReturn<IFormConfig, IFormConfig>
</script>
  
<style lang='less' scoped>
  @import url('../style/variable.less');
  .operate-area {
    height: @operating-area-height;
    border-bottom: 2px solid @border-color-base;
    line-height: @operating-area-height;
    padding-left: 30px;
    font-size: 16px;
    a {
      margin: 0 5px;
      color: #666;
      &.disabled,
      &.disabled:hover {
        color: #ccc;
      }

      &:hover {
        color: @primary-color;
      }

      span {
        font-size: 14px;
      }
    }
  }
</style>