<!--
 * @Date: 2024-05-11 15:05:30
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable @register="register">
      <template #toolbar>
        <PButton type="primary" @click="expandAll">展开全部</PButton>
        <PButton type="primary" @click="collapseAll">折叠全部</PButton>
        <PButton type="primary">折叠第五行</PButton>
        <PButton type="primary">展开第五行</PButton>
      </template>
    </PBasicTable>
  </div>
</template>
  
<script lang='ts' setup>
  import { useTable } from '@c/PBase/Table/index'
  import { getBasicColumns, getTreeTableData } from './tableData'

  const [ register, { expandAll, collapseAll } ] = useTable({
    title: '树形表格',
    titleHelpMessage: '树形结构不能与序号列同时存在',
    isTreeTable: true,
    accordion: true,
    rowKey: 'id',
    columns: getBasicColumns(),
    dataSource: getTreeTableData()
  })
</script>
  
<style lang='less' scoped>
  
</style>