<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" alt="" />
    </template>
    <PBasicTable 
      class="error-handle-table" 
      @register="register">
      <template #toolbar>
        <PButton type="primary" @click="fireVueError">
          {{ t('sys.errorLog.fireVueError') }}
        </PButton>
        <PButton type="primary"  @click="fireSourceError">
          {{ t('sys.errorLog.fireResourceError') }}
        </PButton>
        <PButton type="primary" @click="fireAjaxError">
          {{ t('sys.errorLog.fireAjaxError') }}
        </PButton>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction 
            :action="[
              {
                label: t('sys.errorLog.tableActionDesc'),
                onClick: handleShowDetail.bind(null, record)
              }
            ]"/>
        </template>
      </template>
    </PBasicTable>

    <DetailModal @register="modalRegister" />
  </div>
</template>
  
<script lang='ts' setup>
  import { watch, ref, nextTick } from 'vue'
  import { useI18n } from '@h/web/useI18n'
  import { useTable, TableAction } from '@c/PBase/Table/index'
  import { useModal } from '@c/PBase/Modal/index'
  import { useErrorLogStoreWithOut } from '@s/modules/errorLog'
  import { fireErrorApi } from '@/api/demo/error'
  import { getColumns } from './data'
  import DetailModal from './DetailModal.vue'
  import { ErrorLogInfo } from '#/store'
  const { t } = useI18n()
  const errorLogStore = useErrorLogStoreWithOut()
  const [ register, { setTableData } ] = useTable({
    columns: getColumns(),
    title: t('sys.errorLog.tableTitle'),
    actionColumn: {
      title: 'Action',
      dataIndex: 'action',
      width: 100
    }
  })
  const [ modalRegister, { openModal } ] = useModal()
  const rowInfo = ref<ErrorLogInfo>()
  const imgList = ref<string[]>([])

  watch(() => errorLogStore.getErrorLogInfoList, (list) => {
    nextTick(() => {
      setTableData(list)
    })
  }, { immediate: true })

  const handleShowDetail = (data) => {
    rowInfo.value = data
    openModal(true)
  }

  // vue报错
  const fireVueError = () => {
    throw new Error('vue-error!!')
  }

  // 资源加载错误
  const fireSourceError = () => {
    imgList.value.push(`${Date.now()}.png`)
  }

  // 请求错误
  const fireAjaxError = () => {
    fireErrorApi()
  }

</script>
  
<style lang='less' scoped>
  
</style>