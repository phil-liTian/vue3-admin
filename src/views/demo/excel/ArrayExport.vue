<template>
  <PageWrapper title="array数据导出">
    <PBasicTable 
      :columns="columns" 
      :dataSource="data">
      <template #toolbar>
        <PButton @click="aoaToExcel">导出</PButton>
        <PButton danger @click="aoaToMultipleSheet">导出多sheet</PButton>
      </template>
    </PBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { columns, data, arrHeader, arrData } from './data';
  import { aoaToSheetXlsx, aoaToMultipleSheetXlsx } from '@c/Excel/index'
  console.log('data', data);

  const aoaToExcel = () => {
    console.log('arrData', arrData);
    
    aoaToSheetXlsx({ 
      data: arrData, 
      header: arrHeader, 
      fileName: '二维数组方式导出.xlsx' 
    })
  }

  const aoaToMultipleSheet = () => {
    aoaToMultipleSheetXlsx({
      sheetList: [
        {
          data: arrData,
          header: arrHeader,
          sheetName: 'test-sheet-1'
        },
        {
          data: arrData,
          header: arrHeader
        }
      ],
    })
  }
  
</script>
  
<style lang='less' scoped>
  
</style>