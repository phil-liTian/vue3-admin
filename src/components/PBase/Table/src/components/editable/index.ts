/*
 * @Date: 2024-06-04 13:25:33
 * @LastEditors: phil_litian
 */
import { h } from 'vue'
import EditableCell from './EditableCell.vue'
import { BasicColumn } from '../../types/table'

interface Params {
  text: string;
  index: number;
  record: Recordable
}

export function renderEditCell(column: BasicColumn) {
  return ({ text: value, record, index }: Params) => {
    
    return h(EditableCell, { value, column, record, index })
  }
}
