<!--
 * @Date: 2024-05-13 17:52:04
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper>
    <PBasicTable @register="register">
      <template #toolBar>
        <PButton type="primary" >刷新当前页</PButton>
        <PButton type="primary" >刷新并返回第一页</PButton>
      </template>
    </PBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { getBasicColumns } from './tableData'
  import { useTable } from '@c/PBase/Table/index'
  import { demoListApi } from '@/api/demo/table'
  // TODO: 完善 useTableScroll & pageWrapper
  const [register] = useTable({
    title: '远程加载示例',
    columns: getBasicColumns(),
    pagination: { pageSize: 10 },
    loading: false,
    api: demoListApi
  })
</script>
  
<style lang='less' scoped>
  
</style>