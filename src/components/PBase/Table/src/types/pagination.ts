/*
 * @Date: 2024-05-13 21:15:29
 * @LastEditors: phil_litian
 */

import { PaginationConfig } from "ant-design-vue/es/pagination"


interface PaginationRenderProps {
  page: number
}

export interface PaginationProps extends PaginationConfig {
  // total?: number,

  // pageSize?: Number,

  // current?: number,

}