/*
 * @Date: 2024-05-11 11:40:40
 * @LastEditors: phil_litian
 */

import { ComputedRef, computed, onMounted, ref, unref, watch, watchEffect } from "vue";
import { get } from 'lodash-es'
import { BasicTableProps, FetchParams } from "../types/table";
import { isArray, isFunction } from "@/utils/is";
import { FETCH_SETTING } from '../const'
import { useTimeoutFn } from "@vueuse/core";
import { PaginationProps } from "../types/pagination";


export function useDataSource(propsRef: ComputedRef<BasicTableProps>, { tableData, setPagination, getPaginationInfo, setLoading }, emit: EmitType) {
  let dataSourceRef = ref<Recordable[]>([])
  let rawDataSourceRef = ref<Recordable[]>([]) // 接口返回的原始数据

  watch(() => unref(propsRef).dataSource, (dataSource) => {
    dataSourceRef.value = dataSource
    console.log('dataSource', dataSource);
    
  }, { immediate: true })

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  const fetch = async (opt?: FetchParams) => {
    const { api } = unref(propsRef)
    console.log('api', api);
    
    
    if ( !api || !isFunction(api) ) return
    try {
      setLoading(true)
      const { pageField, sizeField, totalField, listField } = Object.assign({}, FETCH_SETTING)
      const { pageSize, current } = unref(getPaginationInfo)
      let pageParams: Recordable = {}

      pageParams[pageField] = opt?.page || current
      pageParams[sizeField] = pageSize
      let params = {
        ...pageParams
      }
      
      const res = await api(params)
      rawDataSourceRef.value = res
      // 结果不带分页内容 直接返回所有数据
      const isArrayResult = isArray(res) 

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField)
      const resultTotal: number = isArrayResult ? res.length : get(res, totalField)
      dataSourceRef.value = resultItems

      setPagination({
        total: resultTotal
      })

      if ( opt?.page ) {
        setPagination({
          current: opt.page || 1
        })
      }

      emit('fetch-success', {
        items: unref(resultItems),
        total: resultTotal
      })
    } catch(error) {
      emit('fetch-error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    setPagination(pagination)

    fetch()
    
    emit('change', pagination, filters, sorter)
  }

  const getDataSourceRef = computed(() => {
    return dataSourceRef.value
  })

  function getDataSource<T = Recordable>() {
    return unref(getDataSourceRef) as T[]
  }

  function getRawDataSource<T = Recordable>() {
    return unref(rawDataSourceRef) as T
  }

  // 重载
  async function reload(opt?: FetchParams) {
    return await fetch(opt)
  }

  onMounted(() => {
    useTimeoutFn(() => fetch(), 30)
  })

  return { 
    fetch,
    reload,
    getDataSource,
    getRawDataSource,
    getDataSourceRef,
    handleTableChange
  }
}

