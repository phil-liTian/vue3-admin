<!--
 * @Date: 2024-03-29 09:21:41
 * @LastEditors: phil_litian
-->
<template>
  <Card :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
  
<script lang='ts' setup>
  import { ref, watch } from 'vue'
  import { Card } from 'ant-design-vue'
  import { useECharts } from '@h/web/useECharts'
  import { propTypes } from '@u/propTypes'
  const chartRef = ref<Nullable<HTMLDivElement>>(null)
  const { setOptions } = useECharts(chartRef)

  const props = defineProps({
    loading: propTypes.bool.def(false),
    width: propTypes.string.def('100%'),
    height: propTypes.string.def('100%')
  })

  watch(() => props.loading, () => {
    if( props.loading ) return

    setOptions({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    })

  }, { immediate: true })

  
</script>
  
<style lang='less' scoped>
  
</style>