<!--
 * @Date: 2024-05-13 22:01:36
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <div class="mb-4">
      <PButton class="mr-2" @click="reloadTable">还原</PButton>
      <PButton class="mr-2" @click="handleChangeLoading">开启loading</PButton>
      <PButton class="mr-2" @click="changeColumns">更改columns</PButton>
      <PButton class="mr-2" @click="handleGetColumn">获取columns</PButton>
      <PButton class="mr-2" @click="getTableData">获取表格中的数据</PButton>
      <PButton class="mr-2" @click="getTableRawData">获取接口原始数据</PButton>
      <PButton class="mr-2" @click="setPaginationInfo">跳转到第二页</PButton>
    </div>
    <div class="mb-4">
      <PButton class="mr-2" @click="getSelectRowList"> 获取选中行 </PButton>
      <PButton class="mr-2" @click="getSelectRowKeyList"> 获取选中行Key </PButton>
      <PButton class="mr-2" @click="setSelectRowKeyList"> 设置选中行 </PButton>
      <PButton class="mr-2" @click="handleClearSelectedRowKeys"> 清空选中行 </PButton>
      <PButton class="mr-2" @click="getPagination"> 获取分页信息 </PButton>
    </div>

    <PBasicTable 
      title="RefTable示例"
      titleHelpMessage="使用Ref调用表格内的方法"
      ref="tableRef"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
      :columns="columns"
      :api="demoListApi" />
  </div>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from 'vue';
  import { TableActionType } from '@/components/PBase/Table';
  import { getBasicColumns, getBasicShortColumns } from './tableData'
  import { demoListApi } from '@/api/demo/table'
  import { useMessage } from '@/hooks/web/useMessage';
  const columns = getBasicColumns()

  const tableRef = ref<Nullable<TableActionType>>(null)
  const { createMessage } = useMessage()
  function getTableAction() {
    const tableAction = unref(tableRef)
    if ( !tableAction ) {
      throw new Error('tableAction is null')
    }
    console.log('tableAction', tableAction);
    
    return tableAction
  }

  const reloadTable = () => {
    getTableAction().setProps({
      columns: getBasicColumns(),
      rowSelection: {
        type: 'checkbox'
      },
      showIndexColumn: true
    })
    getTableAction().reload({
      page: 1
    })
  }

  const handleChangeLoading = () => {
    getTableAction().setLoading(true)
    setTimeout(() => {
      getTableAction().setLoading(false)
    }, 1000);
  }

  const handleGetColumn = () => {
    createMessage.info('请在控制台中查看～')
    console.log('columns', getTableAction().getColumns());
  }

  const changeColumns = () => {
    getTableAction().setProps({
      columns: getBasicShortColumns(),
      rowSelection: { type: 'checkbox' }
    })
  }

  const getTableData = () => {
    createMessage.info('请在控制台中查看～')
    console.log('dataSource', getTableAction().getDataSource());
  }

  const getTableRawData = () => {
    createMessage.info('请在控制台中查看～')
    console.log('dataSource', getTableAction().getRawDataSource());
  }

  const setPaginationInfo = () => {
    getTableAction().setPagination({
      current: 2
    })
    getTableAction().reload()
  }

  // 获取选中行
  const getSelectRowList = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getSelectRowKeys', getTableAction().getSelectRows());
  }

  // 获取选中行的key
  const getSelectRowKeyList = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getSelectRowKeys', getTableAction().getSelectRowKeys());
  }

  // 设置选中行
  const setSelectRowKeyList = () => {
    getTableAction().setSelectedRowKeys(['1', '2', '3'])
  }

  // 清空选中行
  const handleClearSelectedRowKeys = () => {
    getTableAction().clearSelectedRowKeys()
  }

  // 获取分页信息
  const getPagination = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getPagination()', getTableAction().getPaginationRef());
  }
</script>
  
<style lang='less' scoped>
  
</style>