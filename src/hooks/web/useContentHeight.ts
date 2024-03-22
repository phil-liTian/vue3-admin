/*
 * @Date: 2024-03-22 17:12:58
 * @LastEditors: phil_litian
 */
import type { Ref, ComputedRef } from 'vue'
import { ref } from 'vue'

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
  const calcSubtractSpace = () => {

  }

  // 获取dom元素
  function getEl (element: any): Nullable<HTMLDivElement> {
    if ( !element ) return null
    return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement
  }

  // 动态计算高度
  const calcContentHeight = () => {
    if(!flag.value) return
    
  }

  calcContentHeight()

  return { contentHeight }
}