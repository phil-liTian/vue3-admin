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
    const totalNo = tableData?.reduce((pre, cur) => {
      pre += cur.no
      return pre
    }, 0)

    return [
      {
        _row: '合计',
        _index: '平均值',
        no: totalNo
      },
      {
        _row: '合计',
        _index: '平均值',
        no: totalNo
      }
    ]
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