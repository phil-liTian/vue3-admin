<!--
 * @Date: 2024-03-22 16:39:49
 * @LastEditors: phil_litian
-->
<template>
  <Card title="销售统计">
    <div ref='chartRef' :style="{ width, height }"></div>
  </Card>
</template>
  
<script lang='ts' setup>
import { Card } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { useECharts } from '@h/web/useECharts'

const chartRef = ref<Nullable<HTMLDivElement>>(null)
const props = defineProps({
  loading: propTypes.bool.def(false),
  width: propTypes.string.def('100%'),
  height: propTypes.string.def('300px')
})

const { setOptions } = useECharts(chartRef)

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      return;
    }
    setOptions({
      legend: {
        bottom: 0,
        data: ['Visits', 'Sales'],
      },
      tooltip: {},
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
          {
            name: '2017',
          },
          {
            name: '2017',
          },
          {
            name: '2018',
          },
          {
            name: '2019',
          },
          {
            name: '2020',
          },
          {
            name: '2021',
          },
        ],
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: [90, 50, 86, 40, 50, 20],
              name: 'Visits',
              itemStyle: {
                color: '#b6a2de',
              },
            },
            {
              value: [70, 75, 70, 76, 20, 85],
              name: 'Sales',
              itemStyle: {
                color: '#67e0e3',
              },
            },
          ],
        },
      ],
    });
  },
  { immediate: true },
);


</script>
  
<style lang='less' scoped>
  
</style>