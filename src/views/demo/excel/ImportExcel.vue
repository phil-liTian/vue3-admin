<template>
  <PageWrapper>
    <ImportExcel @success="loadDataSuccess">
      <PButton> 导入Excel </PButton>
    </ImportExcel>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ImportExcel, ExcelData } from '@c/Excel/index';

  const loadDataSuccess = (excelDataList: ExcelData[]) =>{
    console.log('excelDataList', excelDataList);
  }
</script> 
  
<style lang='less' scoped>
  
</style>