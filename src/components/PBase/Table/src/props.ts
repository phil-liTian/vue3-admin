/*
 * @Date: 2024-04-29 15:32:32
 * @LastEditors: phil_litian
 */

import { propTypes } from "@/utils/propTypes";
import { PropType } from "vue";
import { DEFAULT_SIZE } from './const'
import { BasicColumn } from "./types/table";

export const basicProps = {
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
  rowKey: propTypes.string.def(''),
  isTreeTable: propTypes.bool.def(false),
  accordion: propTypes.bool.def(false)
}
