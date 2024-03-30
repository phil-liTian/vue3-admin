<!--
 * @Date: 2024-03-29 20:42:29
 * @LastEditors: phil_litian
-->
<template>
  <Card title="成交占比">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { Card } from 'ant-design-vue'
  import { propTypes } from '@/utils/propTypes'
  import { watch } from 'vue';
  import { useECharts } from '@h/web/useECharts'
  const chartRef = ref(null)
  const { setOptions } = useECharts(chartRef)
  const props = defineProps({
    loading: propTypes.bool,
    width: propTypes.string.def('100%'),
    height: propTypes.string.def('300px')
  })

  watch(() => props.loading, () => {
    if ( !props.loading ) return
    setOptions({
      tooltip: {
        trigger: 'item',
      },

      series: [
        {
          name: '成交占比',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
          data: [
            { value: 500, name: '电子产品' },
            { value: 310, name: '服装' },
            { value: 274, name: '化妆品' },
            { value: 400, name: '家居' },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 400;
          },
        },
      ],
    });
  }, { immediate: true })

</script>
  
<style lang='less' scoped>
  
</style>