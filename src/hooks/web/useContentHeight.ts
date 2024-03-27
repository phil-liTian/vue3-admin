/*
 * @Date: 2024-03-22 17:12:58
 * @LastEditors: phil_litian
 */
import { getViewportOffset } from '@/utils/domUtils';
import type { Ref, ComputedRef } from 'vue'
import { nextTick, ref, unref } from 'vue'

type Upward = undefined | null | number | string;

/**
 * 动态计算内容高度
 * 
 * @param flag 用于是否开始计算内容高度的标识
 * @param anchorRef 锚点组件
 * @param subtractHeightRefs 待减去高度的组件列表
 * @param subtractSpaceRefs 待减去空闲空间的组件 padding、margin
 * @param upwardSpace 
 * @param offsetHeightRef 偏移的响应式高度 计算高度时直接减去当前值
 * @returns 
 */
export const useContentHeight = (
  flag: ComputedRef<Boolean>,
  anchorRef: Ref,
  subtractHeightRefs: Ref[],
  subtractSpaceRefs: Ref[],
  upwardSpace: Ref<Upward> | ComputedRef<Upward> | Upward = 0,
  offsetHeightRef: Ref<number> = ref(0)
  ) => {
  const contentHeight: Ref<Nullable<number>> = ref(null)

  // 计算组件的空闲空间 margin、padding
  const calcSubtractSpace = (el: Element): number => {
    return 11
  }

  // 获取dom元素
  function getEl (element: any): Nullable<HTMLDivElement> {
    if ( !element ) return null
    
    return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement
  }

  // 动态计算高度
  const calcContentHeight = async () => {
    // if(!flag.value) return
    await nextTick()
    const anchorEl = getEl(unref(anchorRef))
    if ( !anchorEl ) return

    const { bottomIncludeBody } = getViewportOffset(anchorEl)

    // 需要减去的高度
    let subtractHeight = 0
    subtractHeightRefs.map(item => {
      subtractHeight += getEl(unref(item)).offsetHeight ?? 0
    })

    // 需要减去space的高度 margin/padding
    let subtractSpaceHeight = calcSubtractSpace(getEl(unref(anchorEl))) ?? 0
    subtractSpaceRefs.map(item => {
      subtractSpaceHeight += calcSubtractSpace(getEl(unref(item)))
    })
    
  }

  calcContentHeight()

  return { contentHeight }
}