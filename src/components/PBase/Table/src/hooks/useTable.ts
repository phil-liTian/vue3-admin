/*
 * @Date: 2024-05-10 13:15:40
 * @LastEditors: phil_litian
 */

import { ref, unref } from "vue";
import { getDynamicProps } from '@u/index'
import { error } from '@u/log'
import { BasicColumn, BasicTableProps, TableActionType } from "../types/table";
import { Key } from "ant-design-vue/es/table/interface";

export function useTable(tableProps: Partial<BasicTableProps>): [
  (instance) => void,
  TableActionType
] {
  const tableRef = ref<Nullable<TableActionType>>(null)

  function register(instance: TableActionType) {
    tableRef.value = instance

    tableProps && instance.setProps(tableProps)
  }

  function getTableInstance() {
    const table = unref(tableRef)
    if ( !table ) {
      error('The table instance is not exist')
    }

    return table as TableActionType
  }

  const methods: TableActionType = {
    setProps: (props: BasicTableProps) => {
      getTableInstance().setProps(props)
    },

    getSize: () => {
      return getTableInstance().getSize()
    },

    getColumns: () => {
      return getTableInstance().getColumns()
    },

    setColumns: (columns: BasicColumn[]) => {
      return getTableInstance().setColumns(columns)
    },

    getDataSource: () => {
      return getTableInstance().getDataSource()
    },

    collapseAll: () => {
      return getTableInstance().collapseAll()
    },

    expandAll: () => {
      return getTableInstance().expandAll()
    },
    
    collapseRows: (keyValues: Key[]) => {
      return getTableInstance().collapseRows(keyValues)
    },

    expandRows: (keyValues: Key[]) => {
      return getTableInstance().expandRows(keyValues)
    }
  }


  return [register, methods]
}
