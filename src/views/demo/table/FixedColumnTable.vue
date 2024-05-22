<!--
 * @Date: 2024-05-13 21:43:20
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper>
    <PBasicTable @register="register">
    </PBasicTable>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useTable, BasicColumn } from '@c/PBase/Table/index'
  import { getBasicData } from './tableData.tsx'
  // bodeCell组件 actionColumn
  // fixed bug
  // type: 'radio' bug
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 280,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 260,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 300
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 300,
    },
    {
      title: '开始时间',
      width: 200,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
    }
  ]
  const [register] = useTable({
    title: 'TableAction组件及固定列示例',
    columns,
    rowSelection: { type: 'radio' },
    dataSource: getBasicData(),
    rowKey: 'dataIndex'
  })
</script>
  
<style lang='less' scoped>
  
</style>