/*
 * @Date: 2024-03-26 14:05:25
 * @LastEditors: phil_litian
 */
import { SizeEnum, screenEnum } from '@e/breakpointEnum'
import { useEventListener } from './useEventListener'
import { ComputedRef, ref, computed, unref } from 'vue'

let globalScreenRef: ComputedRef<SizeEnum | undefined>
let globalRealWidthRef: ComputedRef<number>
export const useBreakPoint = () => {
  
  return {
    screenRef: computed(() => globalScreenRef.value),
    screenEnum,
    realWidthRef: globalRealWidthRef
  }
}

// 监听页面变化 是否达到各种不同屏幕尺寸临界点
export const createBreakpointListen = (fn?: () => void) => {
  const realWidthRef = ref(window.innerWidth);
  const screenRef = ref(SizeEnum.XL)
  
  function getWindowWidth() {
    const width = document.body.clientWidth
  }
  globalScreenRef = computed(() => unref(screenRef))
  globalRealWidthRef = computed(() => realWidthRef.value)
  function resizeFn() {
    fn()
  }
  
  useEventListener({
    name: 'resize',
    listener: () => {
      getWindowWidth()
      resizeFn()
    }
  })

  getWindowWidth()
  resizeFn()
}