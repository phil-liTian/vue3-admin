<template>
  <PageWrapper title="excel数据导入">
    <ImportExcel @success="loadDataSuccess">
      <PButton type="primary"> 导入Excel </PButton>
    </ImportExcel>

    <PBasicTable
      v-for="(item, index) in tableListRef"
      :key="index"
      :title="item.title"
      :columns="item.columns"
      :dataSource="item.data" />
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ImportExcel, ExcelData } from '@c/Excel/index';
  import { ref } from 'vue';

  const tableListRef = ref([])

  const loadDataSuccess = (excelDataList: ExcelData[]) =>{
    tableListRef.value = []

    excelDataList.map(excelData => {
      const { meta, header, results } = excelData

      tableListRef.value.push({
        columns: header.map(item => ({
          title: item,
          dataIndex: item
        })),
        data: results,
        title: meta.sheetName
      })
    })

  }
</script> 
  
<style lang='less' scoped>
  
</style>