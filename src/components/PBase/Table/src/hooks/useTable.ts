/*
 * @Date: 2024-05-10 13:15:40
 * @LastEditors: phil
 */

import { ref, unref } from "vue";
import { getDynamicProps } from '@u/index'
import { error } from '@u/log'
import { BasicColumn, BasicTableProps, FetchParams, TableActionType } from "../types/table";
import { Key } from "ant-design-vue/es/table/interface";
import { PaginationProps } from "../types/pagination";

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
    reload: async (opt?: FetchParams) => {
      await getTableInstance().reload(opt)
    },

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

    /**
     * 设置表格中的数据
     * @returns 
     */
    setTableData: (dataList: Recordable[]) => {
      return getTableInstance().setTableData(dataList)
    },
    
    /**
     * 获取表格中的数据
     */
    getDataSource: () => {
      return getTableInstance().getDataSource()
    },

    getRawDataSource: () => {
      return getTableInstance().getRawDataSource()
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
    },

    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading)
    },

    setPagination: (info: Partial<PaginationProps>) => {
      getTableInstance().setPagination(info)
    },

    getPaginationRef: () => {
      return getTableInstance().getPaginationRef()
    },

    getSelectRowKeys: () => {
      return getTableInstance().getSelectRowKeys()
    },

    getSelectRows: () => {
      return getTableInstance().getSelectRows()
    },

    setSelectedRowKeys: (data) => {
      getTableInstance().setSelectedRowKeys(data)
    },

    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys()
    }
  }

  return [register, methods]
}
