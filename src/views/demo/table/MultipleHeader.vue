<!--
 * @Date: 2024-05-23 21:45:07
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable @register="register" />
  </div>
</template>
  
<script lang='ts' setup>
  import { useTable } from '@c/PBase/Table/index'
  import { getMultipleHeaderColumns } from './tableData'
  import { demoListApi } from '@/api/demo/table'

  const [ register ] = useTable({
    title: '多级表头示例',
    columns: getMultipleHeaderColumns(),
    api: demoListApi
  })
</script>
  
<style lang='less' scoped>
  
</style>