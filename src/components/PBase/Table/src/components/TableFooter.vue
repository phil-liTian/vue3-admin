<!--
 * @Date: 2024-05-11 10:22:23
 * @LastEditors: phil_litian
-->
<template>
  <Table 
    v-if="props.summaryFunc"
    :showHeader="false"
    :bordered="false"
    :pagination="false"
    :columns="getColumns"
    :dataSource="getDataSource" />
</template>
  
<script lang='ts' setup>
  import { computed, PropType, unref } from 'vue'
  import { Table } from 'ant-design-vue'
  import { isFunction } from '@u/is'
  import { useTableContext } from '../hooks/useTableContext'
  defineOptions({ name: 'BasicTableFooter' })
  const props = defineProps({
    summaryFunc: {
      type: Function as PropType<Nullable<Fn>>,
      default: null
    },
    summaryData: {
      type: Array as PropType<Nullable<Array<Recordable>>>,
      default: null
    }
  })

  const table = useTableContext()

  const getColumns = computed(() => {
    const columns = table.getColumns()
    return columns
  })

  const getDataSource = computed(() => {

    if ( !isFunction(props.summaryFunc) ) {
      return []
    }
    let dataSource = unref(table.getDataSource())
    dataSource = props.summaryFunc(dataSource)


    return [{ address: 1, name: 2 }]
  })
</script>
  
<style lang='less' scoped>
  
</style>