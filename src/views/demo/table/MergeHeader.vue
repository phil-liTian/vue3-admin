<!--
 * @Date: 2024-05-23 21:45:25
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable @register="register" />
  </div>
</template>
  
<script lang='ts' setup>
  import { demoListApi } from '@/api/demo/table';
  import { useTable } from '@c/PBase/Table/index'
  import { getMergeHeaderColumns } from './tableData'

  const [ register ] = useTable({
    title: '合并单元格',
    api: demoListApi,
    columns: getMergeHeaderColumns()
  })
</script>
  
<style lang='less' scoped>
  
</style>