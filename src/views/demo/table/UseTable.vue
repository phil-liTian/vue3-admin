<!--
 * @Date: 2024-05-13 22:01:26
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
    <PBasicTable @register="register" />
  </div>
</template>
  
<script lang='ts' setup>
  import { useTable } from '@c/PBase/Table/index'
  import { useMessage } from '@h/web/useMessage'
  import { demoListApi } from '@/api/demo/table'
  import { getBasicColumns, getBasicShortColumns } from './tableData';
  const { createMessage } = useMessage()
  const [ register, 
    { 
      reload,
      setLoading, 
      getColumns, 
      setProps, 
      getDataSource, 
      getRawDataSource, 
      setPagination,
      getPaginationRef,
      getSelectRowKeys,
      getSelectRows,
      setSelectedRowKeys,
      clearSelectedRowKeys
    } ] = useTable({
    columns: getBasicColumns(),
    api: demoListApi,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox'
    },
    pagination: { current: 1 }
  })

  const reloadTable = () => {
    setProps({
      columns: getBasicColumns(),
      rowSelection: {
        type: 'checkbox'
      },
      showIndexColumn: true
    })
    reload({
      page: 1
    })
  }

  const handleChangeLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  const handleGetColumn = () => {
    createMessage.info('请在控制台中查看～')
    console.log('columns', getColumns());
  }

  const changeColumns = () => {
    setProps({
      columns: getBasicShortColumns(),
      rowSelection: { type: 'checkbox' }
    })
  }

  const getTableData = () => {
    createMessage.info('请在控制台中查看～')
    console.log('dataSource', getDataSource());
  }

  const getTableRawData = () => {
    createMessage.info('请在控制台中查看～')
    console.log('dataSource', getRawDataSource());
  }

  const setPaginationInfo = () => {
    setPagination({
      current: 2
    })
    reload()
  }

  // 获取选中行
  const getSelectRowList = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getSelectRowKeys', getSelectRows());
  }

  // 获取选中行的key
  const getSelectRowKeyList = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getSelectRowKeys', getSelectRowKeys());
  }

  // 设置选中行
  const setSelectRowKeyList = () => {
    setSelectedRowKeys(['1', '2', '3'])
  }

  // 清空选中行
  const handleClearSelectedRowKeys = () => {
    clearSelectedRowKeys()
  }

  // 获取分页信息
  const getPagination = () => {
    createMessage.info('请在控制台中查看～')
    console.log('getPagination()', getPaginationRef());
  }
</script>
  
<style lang='less' scoped>
  
</style>