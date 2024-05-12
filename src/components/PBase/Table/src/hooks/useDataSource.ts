/*
 * @Date: 2024-05-11 11:40:40
 * @LastEditors: phil_litian
 */

import { ComputedRef, computed, ref, unref, watch, watchEffect } from "vue";
import { BasicTableProps } from "../types/table";


export function useDataSource(propsRef: ComputedRef<BasicTableProps>, { tableData }) {
  let dataSourceRef = ref<Recordable[]>([])

  watch(() => unref(propsRef).dataSource, (dataSource) => {
    dataSourceRef.value = dataSource
  }, { immediate: true })

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  const getDataSourceRef = computed(() => {
    return dataSourceRef.value
  })

  function getDataSource<T = Recordable>() {
    return unref(getDataSourceRef) as T[]
  }

  return { getDataSource }
}

