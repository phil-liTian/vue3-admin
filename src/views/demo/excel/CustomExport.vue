<template>
  <PageWrapper title="导出" content="可选择导出格式">
    <PBasicTable :dataSource="data" :columns="columns">
      <template #toolbar>
        <PButton type="primary" @click="openModal">导出</PButton>
      </template>
    </PBasicTable>

    <ExportExcelModal @register="register" @success="handleExportData" />
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { data, columns } from './data'
  import { ExportExcelModal, jsonToSheetXlsx } from '@c/Excel/index'
  import { useModal } from '@c/PBase/Modal/index'

  const [ register, { openModal } ] = useModal()

  const handleExportData = ({fileName, bookType}) => {
    jsonToSheetXlsx({
      data,
      header: null,
      fileName,
      write2excelOpts: {
        bookType
      }
    })
  }
</script>
  
<style lang='less' scoped>
  
</style>