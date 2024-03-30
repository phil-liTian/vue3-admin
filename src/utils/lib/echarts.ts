/*
 * @Date: 2024-03-28 21:07:21
 * @LastEditors: phil_litian
 */
// 按需引入echarts

import * as echarts from 'echarts/core'
import { BarChart, PieChart, RadarChart, LineChart } from 'echarts/charts'
import { 
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'


echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  PieChart,
  RadarChart,
  LineChart,
  SVGRenderer
])

export default echarts

