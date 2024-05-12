/*
 * @Date: 2024-04-29 15:30:05
 * @LastEditors: phil_litian
 */

import { withInstall } from '@/utils'
import BasicTable from './src/BasicTable.vue'
export * from './src/types/table'

export { useTable } from './src/hooks/useTable'
export const PBasicTable = withInstall(BasicTable)
