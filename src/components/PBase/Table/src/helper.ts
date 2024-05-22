/*
 * @Date: 2024-05-21 21:37:35
 * @LastEditors: phil_litian
 */
import { ROW_KEY } from './const'
import { BasicTableProps } from "./types/table";

export function parseRowKey<T = any>(rowKey: BasicTableProps['rowKey'], record: T): string | number {
  if ( typeof rowKey === 'string' ) {
    return rowKey
  } else {
    return ROW_KEY
  }
}

export function parseRowKeyValue<T = any>(rowKey: BasicTableProps['rowKey'], record: T): number | string {
  return record[parseRowKey(rowKey, record)]
}