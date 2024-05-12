/*
 * @Date: 2024-05-08 09:42:02
 * @LastEditors: phil_litian
 */

/**
 * 处理表格样式 使用rowClassName实现斑马条纹
 */
import { ComputedRef, unref } from "vue"
import { BasicTableProps } from "../types/table"

export function useTableStyle(props: ComputedRef<BasicTableProps>, prefixCls: string) {
  function getRowClassName(rocord, index: number) {
    const { striped } = unref(props)

    let classNames: string[] = []

    if ( striped ) {
      classNames.push(index % 2 ? '' : `${prefixCls}-row__striped`)
    }

    return classNames.filter(cls => !!cls).join(' ')
  }

  return { getRowClassName }
}
