/*
 * @Date: 2024-05-07 09:33:15
 * @LastEditors: phil_litian
 */

import { ColumnProps } from "ant-design-vue/es/table"
import { FixedType } from "ant-design-vue/es/vc-table/interface"
import { INDEX_COLUMN_FLAG } from '../const'


export interface TableSetting {
  redo?: boolean,
  size?: boolean,
  setting?: boolean,
  fullScreen?: boolean,
  settingCache?: boolean
}
export type SizeType = 'small' | 'default' | 'middle' | 'large'

export interface BasicTableProps<T = any> {
  showTableSetting: boolean,
  title: string | ((data: Recordable) => string),
  titleHelpMessage: string | string[],
  isTreeTable: boolean,
  accordion: boolean,
  striped: boolean,
  size: SizeType,
  columns: BasicColumn[],
  dataSource: Recordable[],
  showIndexColumn?: boolean,
  showSummary?: boolean,
  // 计算合计行的方法
  summaryFunc?: () => [],
  summartData?: Recordable[],
  rowKey: string
}

type IFlagType = 'INDEX' | 'DEFAULT'

export interface BasicColumn extends ColumnProps {
  title: string,
  width?: number,
  flag?: IFlagType,
  dataIndex: string | number
}

// 用于传递给子组件的行为
export interface TableActionType {
  getSize: () => SizeType,
  setProps: (props: Partial<BasicTableProps>) => void,
  getColumns: () => BasicColumn[],
  setColumns: (columns: BasicColumn[]) => void,
  getDataSource: () => Recordable[],
  collapseAll: () => void,
  expandAll: () => void
}

export interface ColumnOptionsType {
  value: string | number,
  label: string,
  fixed?: FixedType
}

