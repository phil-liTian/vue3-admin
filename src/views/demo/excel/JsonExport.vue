<template>
  <PageWrapper>
    <PBasicTable 
      :columns="columns" 
      :dataSource="data">
      <template #toolbar>
        <PButton @click="defaultHeader">导出: 默认头部</PButton>
        <PButton danger @click="customHeader">导出： 自定义头部</PButton>
        <PButton danger @click="handleMultipleSheet">导出多sheet</PButton>
      </template>
    </PBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { columns, data } from './data'
  import { jsonToSheetXlsx, jsonToMultipleSheetXlsx } from '@c/Excel/index'

  const defaultHeader = () => {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({ data: data, header: null, fileName: '用key做默认头部.xlsx' })
  }

  const customHeader = () => {
    jsonToSheetXlsx({ data: data, header: {
      id: 'Id',
      name: '姓名',
      age: '年龄',
      no: '编号',
      address: '地址',
      beginTime: '开始时间',
      endTime: '结束时间'
    }, fileName: '自定义头部.xlsx' })
  }

  const handleMultipleSheet = () => {
    jsonToMultipleSheetXlsx({
      sheetList: [
      {
        data: data,
        header: null,
        sheetName: 'test-sheet-1'
      },
      {
        data: data,
        header: {
          id: 'Id',
          name: '姓名',
          age: '年龄',
          no: '编号',
          address: '地址',
          beginTime: '开始时间',
          endTime: '结束时间'
        }
      }
    ], fileName: '多sheet导出.xlsx'})
  }
</script>
  
<style lang='less' scoped>
  
</style>