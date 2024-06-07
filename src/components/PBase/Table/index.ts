/*
 * @Date: 2024-04-29 15:30:05
 * @LastEditors: phil_litian
 */

import { withInstall } from '@/utils'
import BasicTable from './src/BasicTable.vue'
export { default as TableAction } from './src/components/TableAction.vue'
export * from './src/types/table'
export * from './src/types/tableAction'
export * from './src/componentMap'

export { useTable } from './src/hooks/useTable'
export const PBasicTable = withInstall(BasicTable)
