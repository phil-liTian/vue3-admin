/*
 * @Date: 2024-05-11 15:29:13
 * @LastEditors: phil_litian
 * 控制treeTable的展开收起状态
 */

import { ComputedRef, computed, nextTick, ref, unref } from "vue";
import { BasicTableProps } from "../types/table";
import { Key } from "ant-design-vue/es/table/interface";

export function useTableExpand(propsRef: ComputedRef<BasicTableProps>, tableData, emits: EmitType) {
  const expandedRowKeys = ref([])

  // 默认为key
  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef)
    return rowKey
  })
  
  const getExpandOptions = computed(() => {
    const { isTreeTable } = unref(propsRef)
    if ( !isTreeTable ) return {}
    return {
      expandedRowKeys: unref(expandedRowKeys),
      onExpandedRowsChange: (keys: string[]) => {
        expandedRowKeys.value = keys
        emits('expanded-rows-change', keys)
      }
    }
  })

  function getAllKeys(data?: Recordable[]) {
    let keyValues: Array<string | number> = [];
    const { childrenColumnName } = unref(propsRef);
    (unref(data) || []).map(item => {
      keyValues.push(item[unref(getRowKey)])
      if ( item[childrenColumnName]?.length ) {
        getAllKeys(item[childrenColumnName])
      }
    })

    return keyValues
  }

  // 全部打开
  function expandAll() {
    const keys = getAllKeys(tableData)
    expandedRowKeys.value = keys
  }

  // 全部合起
  function collapseAll() {
    expandedRowKeys.value = []
  }

  function expandRows(keyValues: Key[]) {
    const { isTreeTable } = unref(propsRef)
    if ( !isTreeTable ) return
    expandedRowKeys.value = [...expandedRowKeys.value, ...keyValues]
    
  }

  function collapseRows(keyValues: Key[]) {
    const { isTreeTable } = unref(propsRef)
    if ( !isTreeTable ) return
    expandedRowKeys.value = expandedRowKeys.value.filter(keyValue => !keyValues.includes(keyValue))
  }

  // 直接改变paths (内容为当前record所有children里面元素的rowKey集合)
  function getKeyPaths(records: Recordable[], childrenColumnName: string, keyValue, paths: Key[]) {
    for (const record of records) {
      paths.push(record[unref(getRowKey)])
      const children = record[childrenColumnName]
      if ( Array.isArray(children) && getKeyPaths(children, childrenColumnName, keyValue, paths) ) {
        return true
      }
    }
    return false
  }

  // 手风琴展开
  function expandRowAccordion(records: Recordable[], keyValue: Key) {
    const { childrenColumnName } = unref(propsRef)
    let paths: Key[] = []
    // 需要获取当前record下面的所有rowKey(处理当前的paths 使paths的内容包含当前record下面的所有rowKey)
    getKeyPaths(records, childrenColumnName, keyValue, paths)
    
    expandedRowKeys.value = paths
  }

  // table展开事件 用于支持手风琴展示效果
  const handleTableExpand = (expanded, record) => {
    const { accordion } = unref(propsRef)
    
    if ( accordion && expanded ) {
      nextTick(() => {
        expandRowAccordion([record], record[unref(getRowKey)])
      })
    }
  }

  return {
    getExpandOptions,
    handleTableExpand,
    expandAll,
    collapseAll,
    expandRows,
    collapseRows
  }
}
