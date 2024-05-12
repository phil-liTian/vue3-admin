/*
 * @Date: 2024-05-11 15:29:13
 * @LastEditors: phil_litian
 * 控制treeTable的展开收起状态
 */

import { ComputedRef, computed, ref, unref } from "vue";
import { BasicTableProps } from "../types/table";

export function useTableExpand(propsRef: ComputedRef<BasicTableProps>, tableData, emits: EmitType) {
  const expandedRowKeys = ref([])

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
    (unref(data) || []).map(item => {
      keyValues.push(item[unref(getRowKey)])
      if ( item.children?.length ) {
        getAllKeys(item.children)
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

  // table展开事件 用于支持手风琴展示效果
  const handleTableExpand = (expanded, record) => {
    const { accordion } = unref(propsRef)
    if ( accordion && expanded ) {
      console.log('handleTableExpand', record);
    }
  }

  return {
    getExpandOptions,
    handleTableExpand,
    expandAll,
    collapseAll
  }
}
