/*
 * @Date: 2024-05-13 21:27:07
 * @LastEditors: phil_litian
 * 处理列表滚动
 */

import { ComputedRef, computed, nextTick, onMounted, ref, unref } from "vue";
import type { Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { onMountedOrActivated } from '@phil/hooks'
import { BasicTableProps } from "../types/table";
import { getViewportOffset } from "@/utils/domUtils";

export function useTableScroll(propsRef: ComputedRef<BasicTableProps>,{ wrapRef, tableElRef }) {
  const tableHeightRef = ref(167)
  let paginationEl: Nullable<HTMLElement> = null
  let tableWrapperPadding: number = 6

  const debounceRedoHeight = useDebounceFn(redoHeight, 200)
  /**
   * 计算表头的高度
   * @param headerEl 
   * @returns 
   */
  const calcHeaderHeight = (headerEl: Element): number => {
    let headerHeight = 0
    if ( headerEl ) {
      headerHeight = (headerEl as HTMLElement).offsetHeight
    }
    return headerHeight
  }

  const calcPaginationHeight = (tableEl: Element): number => {
    const { pagination } = unref(propsRef)
    let paginationHeight = 0
    console.log('pagination', pagination);
    
    if ( pagination ) {
      // 显示分页的时候 计算分页器的高度
      if ( !paginationEl ) {
        paginationEl = tableEl.querySelector('.ant-pagination') as HTMLElement
      }
      const paginationElMarginTop = parseInt(getComputedStyle(paginationEl).marginTop)
      const paginationElMarginBottom = parseInt(getComputedStyle(paginationEl).marginBottom)
      
      const offsetHeight = paginationEl.offsetHeight
      paginationHeight = offsetHeight + paginationElMarginTop + paginationElMarginBottom

      console.log('paginationEl', paginationEl);
    }

    return paginationHeight
  }

  const getMarginPaddingHeight = (): number => {
    return tableWrapperPadding + 16
  }

  /**
   * 从表头一直到body底部的高度
   * @param tableEl 
   * @param headerEl 
   */
  const calcBottomAndPaddingHeight = (tableEl: Element, headerEl: Element) => {
    let bottomIncludeBody = 0
    // if ( unref(wrapRef) ) {
    //   const wrapHeight = unref(wrapRef)?.offsetHeight ?? 0
      
    //   bottomIncludeBody = wrapHeight
    // } 

    // 直接计算表头到body底部的高度（不包含自定义title的内容）
    bottomIncludeBody = getViewportOffset(headerEl).bottomIncludeBody

    console.log('bottomIncludeBody', bottomIncludeBody);
    
    return bottomIncludeBody
  }

  const calcTableHeight = async () => {
    const table = unref(tableElRef)
    if ( !table ) return
    
    const tableEl: Element = table.$el
    if(!tableEl) return

    await nextTick()
    const headerEl = tableEl.querySelector('.ant-table-thead')
    if ( !headerEl ) return

    const bottomIncludeBody = calcBottomAndPaddingHeight(tableEl, headerEl)
    const headerHeight = calcHeaderHeight(headerEl)
    const paginationHeight = calcPaginationHeight(tableEl)
    // 表格的margin和padding高度
    const marginPaddingHeight = getMarginPaddingHeight()

    // 等式: 表格高度 = 表头到body底部的高度 - 表头高度 - 分页器高度 - 
    let height = Math.floor(bottomIncludeBody - headerHeight - paginationHeight - marginPaddingHeight - 1)
      
    setHeight(height) 
  }

  function setHeight(height: number) {
    tableHeightRef.value = height
  }

  function redoHeight () {
    nextTick(() => {
      calcTableHeight()
    })
  }
  
  const getScrollRef = computed(() => {
    const tableHeight = unref(tableHeightRef)
    console.log('tableHeight', tableHeight);
    
    return {
      y: tableHeight
    }
  })

  // onMounted(() => calcTableHeight())
  // setTimeout(() => {
  //   calcTableHeight()
  // }, 2000);
  // nextTick(() => calcTableHeight())

  onMountedOrActivated(() => {
    calcTableHeight()
    nextTick(() => debounceRedoHeight())
  })

  return {
    getScrollRef
  }
}
