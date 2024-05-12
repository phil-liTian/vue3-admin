<!--
 * @Date: 2024-05-07 09:14:48
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable
      title="基础表格"
      titleHelpMessage="温馨提示"
      :columns="columns"
      :loading="loading"
      :canResize="canResize"
      :bordered="border"
      :striped="striped"
      showTableSetting
      :pagination="false"
      :dataSource="dataSource">

      <template #toolbar>
        <PButton class="mr-4" type="primary">{{ !canResize ? '自适应高度' : '取消自适应' }} </PButton>
        <PButton class="mr-4" type="primary" @click="toggleBorder">{{ !border ? '显示边框' : '隐藏边框' }} </PButton>
        <PButton class="mr-4" type="primary" @click="toggleLoading">开启loading</PButton>
        <PButton class="mr-4" type="primary" @click="toggleStriped">{{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}</PButton>
      </template>
    </PBasicTable>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { getBasicColumns, getBasicData } from './tableData'
  const loading = ref(false)
  const canResize = ref(false)
  const border = ref(true)
  const striped = ref(true)
  const columns = getBasicColumns()
  const dataSource = getBasicData()
  // 2. redo 密度 列设置

  const toggleLoading = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000);
  }

  const toggleBorder = () => {
    border.value = !border.value
  }

  const toggleStriped = () => {
    striped.value = !striped.value
  }
</script>
  
<style lang='less' scoped>
  
</style>