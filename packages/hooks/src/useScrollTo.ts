/*
 * @Date: 2024-04-18 21:42:57
 * @LastEditors: phil_litian
 */

import { ref, unref } from "vue";

interface UseScrollToOptions {
  el: any,
  to: number,
  duration?: number,
  callback?: () => void
}
// 缓动函数 先快 -> 到中间位置达到最快 -> 后慢
function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  
  return 1
}

function position(el: HTMLElement) {
  return el.scrollTop
}

function move(el: HTMLElement, amount: number) {
  el.scrollTop = amount
}

export function useScrollTo({ el, to, duration = 500, callback }: UseScrollToOptions) {
  const isActiveRef = ref(false)
  const startPosi = position(el)
  const change = to - startPosi
  const increment = 20
  let currentTime = 0

  const animationScroll = () => {
    if ( !isActiveRef.value ) return
    currentTime += increment
    // 
    const val = easeInOutQuad(currentTime, startPosi, change, duration)
    move(el, to)
    if ( currentTime < duration && unref(isActiveRef) ) {
      // 会在浏览器下一次重绘之前调用指定的回调函数，从而实现平滑的动画效果
      requestAnimationFrame(animationScroll)
    } else if ( callback &&  typeof callback === 'function' ) {
      callback()
    }
  }

  const run = () => {
    isActiveRef.value = true
    animationScroll()
  }

  const stop = () => {
    isActiveRef.value = false
  }

  return {
    start: run,
    stop
  }
  
}