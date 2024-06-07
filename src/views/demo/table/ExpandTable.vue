<!--
 * @Date: 2024-05-29 21:37:50
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="可展开表格">
    <PBasicTable @register="register">
      <template #expandedRowRender="{ record }">
        No.{{ record.no }}
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction 
            :actions="[
              { 
                label: '删除', 
                icon: 'material-symbols-light:delete-outline',
                onClick: handleDelete.bind(null, record)
              }
            ]"
            :dropDownActions="[
              { 
                text: '启用', 
                popConfirm: { 
                  title: '是否启用？',
                  confirm: handleOpen.bind(null, record)
                },
              }
            ]" />
        </template>
      </template>
    </PBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useTable, TableAction } from '@c/PBase/Table/index'
  import { demoListApi } from '@/api/demo/table'
  import { getBasicColumns } from './tableData'

  const handleDelete = (record) => {
    console.log('handleDelete', record);
  }

  const handleOpen = (record) => {
    console.log('handleOpen', record);
  }

  const [ register ] = useTable({
    title: '可展开表格演示',
    columns: getBasicColumns(),
    api: demoListApi,
    rowKey: 'id',
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right'
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>