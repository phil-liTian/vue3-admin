/*
 * @Date: 2024-03-22 17:12:58
 * @LastEditors: phil_litian
 */
import { getViewportOffset } from '@/utils/domUtils';
import type { Ref, ComputedRef } from 'vue'
import { nextTick, ref, unref, watch } from 'vue'
import { useLayoutHeight } from '@/layout/default/content/useContentViewHeight'

type Upward = undefined | null | number | string;
type Direction = 'all' | 'top' | 'bottom'

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
  const { footerHeightRef: layoutFooterHeightRef } = useLayoutHeight()

  // 计算组件的空闲空间 margin、padding
  const calcSubtractSpace = (el: Element, direction: Direction = 'all'): number => {
    // 去掉所有非数字
    function dPx(px: string): number {
      return Number(px.replace(/[^\d]/g, ''))
    }
    let subtractHeight = 0
    const ZERO_PX = '0px'
    if ( el ) {
      const cssStyle = getComputedStyle(el) // 获取所有的样式
      const marginTop = dPx(cssStyle.marginTop ?? ZERO_PX)
      const margintBottom = dPx(cssStyle.marginBottom ?? ZERO_PX)
      const paddingBottom = dPx(cssStyle.paddingBottom ?? ZERO_PX)
      const paddingTop = dPx(cssStyle.paddingTop ?? ZERO_PX)
      
      if ( direction === 'all' ) {
        subtractHeight += marginTop
        subtractHeight += margintBottom
        subtractHeight += paddingBottom
        subtractHeight += paddingTop
      } else if ( direction === 'top' ) {

      } else if (direction === 'bottom') {

      }
    }

    return subtractHeight
  }

  // 获取dom元素
  function getEl (element: any): Nullable<HTMLDivElement> {
    if ( !element ) return null
    
    return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement
  }

  // 动态计算高度
  const calcContentHeight = async () => {
    if(!flag.value) return
    await nextTick()
    const anchorEl = getEl(unref(anchorRef))
    if ( !anchorEl ) return

    const { bottomIncludeBody } = getViewportOffset(anchorEl)
    
    // 需要减去的高度
    let subtractHeight = 0
    subtractHeightRefs.map(item => {
      // offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding）和边框（border），不包含外边距（margin）
      subtractHeight += getEl(unref(item))?.offsetHeight ?? 0
    })

    // 需要减去space的高度 margin/padding
    let subtractSpaceHeight = calcSubtractSpace(anchorEl) ?? 0
    subtractSpaceRefs.map(item => {
      subtractSpaceHeight += calcSubtractSpace(getEl(unref(item)))
    })

    // 内容高度
    // console.log('layoutFooterHeightRef', layoutFooterHeightRef);
    let height = bottomIncludeBody - unref(layoutFooterHeightRef) - subtractSpaceHeight - subtractHeight

    

    contentHeight.value = height
  }

  watch(() => [layoutFooterHeightRef.value], () => {
    calcContentHeight()
  }, { immediate: true })

  calcContentHeight()

  return { contentHeight }
}