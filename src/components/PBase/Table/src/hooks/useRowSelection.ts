/*
 * @Date: 2024-05-13 11:02:17
 * @LastEditors: phil_litian
 */

import { ComputedRef, computed, ref, unref } from "vue";
import { BasicTableProps } from "../types/table";
import { Key, TableRowSelection } from "ant-design-vue/es/table/interface";

// 处理选中状态
export function useRowSelection(propsRef: ComputedRef<BasicTableProps>) {
  const selectedRowKeysRef = ref<Key[]>([])

  const getRowSelectionRef = computed((): (Nullable<TableRowSelection>) => {
    const { rowSelection } = unref(propsRef)
    if ( !rowSelection ) return null
    return {
      selectedRowKeys: unref(selectedRowKeysRef),
      onChange(selectedRowKeys: Key[], selectedRows: any[]) {
        // 待处理
        selectedRowKeysRef.value = selectedRowKeys
      }
    }
  })

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef)
  }


  return {
    getRowSelectionRef,
    getSelectRowKeys
  }
}
