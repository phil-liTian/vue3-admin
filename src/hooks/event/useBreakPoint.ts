/*
 * @Date: 2024-03-26 14:05:25
 * @LastEditors: phil_litian
 */
import { SizeEnum } from '@e/breakpointEnum'
import { useEventListener } from './useEventListener'

export const useBreakPoint = () => {
  
  return {
    
  }
}

// 监听页面变化 是否达到各种不同屏幕尺寸临界点
export const createBreakpointListen = (fn?: () => void) => {
  function getWindowWidth() {
    const width = document.body.clientWidth
    console.log('width', width);
  }

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