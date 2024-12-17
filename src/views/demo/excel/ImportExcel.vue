<template>
  <PageWrapper title="excel数据导入">
    <ImportExcel @success="loadDataSuccess">
      <PButton type="primary"> 导入Excel </PButton>
    </ImportExcel>

    <ImportExcel @success="loadDataSuccess1">
      <PButton type="primary"> new导入Excel </PButton>
    </ImportExcel>

    <PButton @click="calc">导出</PButton>

    
    

    <!-- <PBasicTable
      v-for="(item, index) in tableListRef"
      :key="index"
      :title="item.title"
      :columns="item.columns"
      :dataSource="item.data" /> -->
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ImportExcel, ExcelData, aoaToSheetXlsx } from '@c/Excel/index';
  import { ref } from 'vue';

  const tableListRef = ref([])

  let originalDataList = []
  let toDataList = []

  const loadDataSuccess = (excelDataList: ExcelData[]) =>{
    tableListRef.value = []

    excelDataList.map(excelData => {
      const { meta, header, results } = excelData
      console.log('results', results);
      originalDataList = results
      
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

  const loadDataSuccess1 = (excelDataList: ExcelData[]) =>{
    tableListRef.value = []

    excelDataList.map(excelData => {
      const { meta, header, results } = excelData
      console.log('results', results);
      toDataList = results
      
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


  const calc = () => {
    toDataList.forEach(item => {
      
      const oItem = originalDataList.find(v => v['姓名'] === item['姓名'])
      
      if ( oItem ) {
        console.log('oItem', item, oItem);

        item['联系电话'] = oItem?.['联系电话'] || '-' 
        item['身份证号码'] = oItem?.['身份证号码'] || '-'
        item['就读幼儿园'] = oItem?.['就读幼儿园'] || '-'
      }

        
      // if (index !== -1) {
      //   toDataList[index]['联系方式'] = item['联系方式']
      // }
    })

    const arrData = toDataList.map(item => Object.values(item));
    
    aoaToSheetXlsx({ 
      data: arrData, 
      header: Reflect.ownKeys(toDataList[0]), 
      fileName: '数据填充完成.xlsx' 
    })
  }

  
</script> 
  
<style lang='less' scoped>
  
</style>