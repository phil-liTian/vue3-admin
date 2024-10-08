/*
 * @Date: 2024-04-29 15:32:32
 * @LastEditors: phil_litian
 */

import { propTypes } from "@/utils/propTypes";
import { PropType } from "vue";
import { DEFAULT_SIZE } from './const'
import { BasicColumn } from "./types/table";
import { TableRowSelection } from "ant-design-vue/es/table/interface";
import { PaginationProps } from "./types/pagination";

export const basicProps = {
  loading: propTypes.bool.def(false),
  dataSource: propTypes.array.def([]),
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },

  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>
  },

  showTableSetting: propTypes.bool.def(false),
  showIndexColumn: propTypes.bool.def(true),
  striped: propTypes.bool.def(true),
  size: propTypes.string.def(DEFAULT_SIZE),
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => ([])
  },
  showSummary: propTypes.bool.def(false),
  summaryFunc: {
    type: [Array, Function],
    default: null
  },
  summaryData: {
    type: Array as PropType<Array<Recordable>>,
    default: null
  },
  rowKey: propTypes.string.def('key'),
  isTreeTable: propTypes.bool.def(false),
  accordion: propTypes.bool.def(false),
  childrenColumnName: propTypes.string.def('children'),
  rowSelection: {
    type: Object as PropType<Nullable<TableRowSelection>>,
    default: null
  },
  // 分页内容
  pagination: {
    type: [Object, Boolean] as PropType<boolean | PaginationProps>,
    default: null
  },
  
  api: {
    type: Function,
    default: null
  },

  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null
  }
}
