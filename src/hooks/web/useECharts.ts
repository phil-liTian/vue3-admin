/*
 * @Date: 2024-03-28 20:00:22
 * @LastEditors: phil_litian
 */

import { Ref, ref, unref } from "vue"
import echarts from "@/utils/lib/echarts"
import type { EChartsOption } from 'echarts'
import { useTimeoutFn, useDebounceFn, tryOnUnmounted } from '@vueuse/core'
import { useEventListener } from '@h/event/useEventListener'

export function useECharts(elRef: Ref<HTMLDivElement>) {

  let chartInstance: Nullable<echarts.ECharts> = null
  let cacheOptions = ref<EChartsOption>({})
  let resizeFn: Fn = resize
  let removeResizeFn: Fn = () => {};

  // 加防抖 200ms内 重复触发resize不重复执行
  resizeFn = useDebounceFn(resize, 200)

  // 初始化charts的实例
  function initCharts() {
    const el = unref(elRef)
    if ( !el ) return

    chartInstance = echarts.init(el)

    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })

    removeResizeFn = removeEvent
  }

  function setOptions(options: EChartsOption) {
    cacheOptions.value = options

    useTimeoutFn(() => {
      if ( !chartInstance ) {
        initCharts()
        if ( !chartInstance ) return
      }

      chartInstance.setOption(options)
    }, 30)
  }


  
  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  function getInstance() {
    if ( !chartInstance ) {
      initCharts()
    }
    return chartInstance
  }
  
  // Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
  // 销毁chartInstance， 移除resize方法
  tryOnUnmounted(() => {
    if ( !chartInstance ) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  return { setOptions, resize, getInstance }
}
