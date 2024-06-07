<!--
 * @Date: 2024-06-07 15:42:13
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper
    title="vexTable表格">
    <VxeBasicTable v-bind="gridOptions">
      1212
    </VxeBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { VxeBasicTable } from '@c/VxeTable'
  import { reactive } from 'vue';
  import { vxeTableColumns } from './tableData'

  const gridOptions = reactive({
    columns: vxeTableColumns,
    toolbar: true,
    toolbarConfig: {
      buttons: [
        {
          code: 'add',
          name: '新增',
          buttonRender: {
            name: 'PButton'
          }
        }
      ]
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>