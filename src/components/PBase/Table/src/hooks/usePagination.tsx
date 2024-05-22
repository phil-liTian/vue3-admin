/*
 * @Date: 2024-05-13 21:20:28
 * @LastEditors: phil_litian
 * 处理分页器
 */

import { ComputedRef, computed, ref, unref } from "vue";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@h/web/useI18n'
import { isBoolean } from '@u/is'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'
import { BasicTableProps } from "../types/table";
import { PaginationProps } from "../types/pagination";

// 第一页不展示上一页按钮
const itemRender = ({ page, type, originalElement }) => {
  if ( type === 'prev' ) {
    return page === 0 ? null : <LeftOutlined />
  } else if ( type === 'next' ) {
    return page === 1 ? null : <RightOutlined />
  }

  return originalElement
}

export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
  const configInfo = ref<PaginationProps>({})
  const show = ref(true)
  const { t } = useI18n()

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(propsRef)
    if ( !unref(show) || !pagination ) {
      return false
    }

    return {
      current: 1,
      size: 'small',
      defaultPageSize: PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showSizeChanger: true,
      showQuickJumper: true,
      itemRender,
      showTotal: (total) => t('component.table.total', { total }),
      ...unref(configInfo)
    }
  })

  const setPagination = (info: Partial<PaginationProps>) => {
    const paginationInfo = unref(getPaginationInfo)
    configInfo.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo as PaginationProps : {}),
      ...info
    }
  }

  const getPagination = () => {
    return unref(getPaginationInfo)
  }

  const getShowPagination = () => {
    return unref(show)
  }

  const setShowPagination = (flag: boolean) => {
    show.value = flag
  }

  return {
    getPaginationInfo,
    setPagination,
    getPagination,
    getShowPagination,
    setShowPagination
  }
}