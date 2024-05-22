/*
 * @Date: 2024-05-13 11:02:17
 * @LastEditors: phil_litian
 */

import { ComputedRef, computed, ref, unref, Ref } from "vue";
import { BasicTableProps } from "../types/table";
import { parseRowKeyValue } from '../helper'
import { Key, TableRowSelection } from "ant-design-vue/es/table/interface";

// 处理选中状态
export function useRowSelection(propsRef: ComputedRef<BasicTableProps>, tableData: Ref<Recordable[]>) {
  const selectedRowKeysRef = ref<Key[]>([])
  const selectedRowRef = ref<Recordable[]>([])
  
  const getRowKey = computed(() => {
    
    return unref(propsRef).rowKey
  })

  const getRowSelectionRef = computed((): (Nullable<TableRowSelection>) => {
    const { rowSelection } = unref(propsRef)
    if ( !rowSelection ) return null
    return {
      selectedRowKeys: unref(selectedRowKeysRef),
      onChange(selectedRowKeys: Key[], selectedRows: any[]) {
        // TODO 是否需要保留之前选中的内容（比如说调整分页之前 或者筛选条件变化之前。。。）
        // 当前页的所有keys 
        const currentPageKeys = tableData.value.map(o => parseRowKeyValue(unref(getRowKey), o))
        console.log('currentPageKeys', currentPageKeys);
        // 当前选中的rowKey集合
        selectedRowKeysRef.value = selectedRows.map(item => item[unref(getRowKey)])
        
        // 当前选中的row的集合
        selectedRowRef.value = selectedRows
      },
      ...rowSelection
    }
  })

  function setSelectedRowKeys(keys: Key[]) {
    selectedRowKeysRef.value = keys
    selectedRowRef.value = tableData.value.filter(v => keys.includes(v[unref(getRowKey)]))
  }

  function clearSelectedRowKeys() {
    selectedRowKeysRef.value = []
    selectedRowRef.value = []
  }

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef)
  }

  function getSelectRows<T = Recordable>() {
    return unref(selectedRowRef) as T[]
  }

  return {
    getRowSelectionRef,
    getSelectRowKeys,
    getSelectRows,
    setSelectedRowKeys,
    clearSelectedRowKeys
  }
}
