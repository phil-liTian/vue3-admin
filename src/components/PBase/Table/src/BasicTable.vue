<!--
 * @Date: 2024-04-29 15:30:29
 * @LastEditors: phil_litian
-->
<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <Table
      v-bind="getBindValues"
      :rowClassName="getRowClassName"
      ref="tableElRef"
      @click="handleTableExpand">
      
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>

      <template #headerCell="{ column }">
        <TableHeaderCell :column="column" />
      </template>
    </Table>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref, toRaw, unref, useAttrs, useSlots } from 'vue';
  import { Table } from 'ant-design-vue';
  import { useDesign } from '@h/web/useDesign'
  import { basicProps } from './props'
  import TableHeaderCell from './components/TableHeaderCell.vue'
  import { useTableHeader } from './hooks/useTableHeader'
  import { useTableFooter } from './hooks/useTableFooter'
  import { useTableStyle } from './hooks/useTableStyle'
  import { useDataSource } from './hooks/useDataSource'
  import { useColumns } from './hooks/useColumns'
  import { useTableExpand } from './hooks/useTableExpand'
  import { createTableContext } from './hooks/useTableContext'
  import { TableActionType, SizeType, BasicTableProps } from './types/table';
  defineOptions({ name: 'PBasicTable' })
  const emits = defineEmits(['register', 'expanded-rows-change'])
  const props = defineProps(basicProps)
  const { prefixCls } = useDesign('basic-table')
  const wrapRef = ref(null)
  const tableElRef = ref(null)
  const tableData = ref([])
  const innerPropsRef = ref<Partial<BasicTableProps>>(null)
  const attrs = useAttrs()
  const slots = useSlots()
  const getWrapperClass = computed(() => {
    return [
      prefixCls,
      attrs.class
    ]
  })

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) } as any
  })

  // 处理header内容 包括标题、toolBar工具域
  const { getHeaderProps } = useTableHeader(slots, getProps)
  // 处理footer内容 包括统计
  const { getFooterProps } = useTableFooter(getProps)
  // 处理table样式
  const { getRowClassName } = useTableStyle(getProps, prefixCls)
  // 处理columns
  const { getColumns, setColumns, getViewColumns } = useColumns(getProps);
  // 处理dataSource
  const { getDataSource } = useDataSource(getProps, { tableData })
  // 处理table展开、收起
  const { 
    getExpandOptions, 
    handleTableExpand, 
    collapseAll, 
    expandAll } = useTableExpand(getProps, tableData, emits)
  
  const getBindValues = computed(() => {
    let propsData = {
      ...attrs,
      ...unref(getProps),
      ...unref(getHeaderProps),
      columns: toRaw(unref(getViewColumns)),
      footer: unref(getFooterProps),
      ...unref(getExpandOptions)
    }
    return propsData
  })

  function setProps(props: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props }
  }

  const tableAction: TableActionType = {
    // 获取table的尺寸
    getSize: () => unref(getBindValues).size as SizeType,
    setProps,
    getColumns,
    setColumns,
    getDataSource,
    collapseAll,
    expandAll
  }
  emits('register', tableAction)
  // 创建一个上下文
  createTableContext({ ...tableAction, wrapRef, getBindValues })
 
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-table';

  .@{prefix-cls} {
    min-width: 100%;
    height: 100%;

    &-row__striped {
      td {
        background-color: @app-content-background;
      }
    }
  }
</style>