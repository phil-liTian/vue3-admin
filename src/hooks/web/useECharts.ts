/*
 * @Date: 2024-03-28 20:00:22
 * @LastEditors: phil_litian
 */

import { Ref, ref, unref } from "vue"
import echarts from "@/utils/lib/echarts"
import type { EChartsOption } from 'echarts'
import { useTimeoutFn } from '@vueuse/core'

export function useECharts(elRef: Ref<HTMLDivElement>) {

  let chartInstance: Nullable<echarts.ECharts> = null
  let cacheOptions = ref<EChartsOption>({})

  // 初始化charts的实例
  function initCharts() {
    const el = unref(elRef)
    if ( !el ) return

    chartInstance = echarts.init(el)
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

  return { setOptions }
}
