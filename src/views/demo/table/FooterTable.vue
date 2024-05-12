<!--
 * @Date: 2024-05-10 13:10:04
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable @register="register" />
  </div>
</template>
  
<script lang='ts' setup>
  import { useTable } from '@c/PBase/Table/index';
  import { getBasicColumns, getBasicData } from './tableData'

  function handleSummary(tableData) {
    console.log('tableData', tableData);
  }

  const [ register ] = useTable({
    title: '表尾行合计示例',
    columns: getBasicColumns(),
    showSummary: true,
    dataSource: getBasicData(),
    summaryFunc: handleSummary
  })
</script>
  
<style lang='less' scoped>
  
</style>