/*
 * @Date: 2024-03-28 21:07:21
 * @LastEditors: phil_litian
 */
// 按需引入echarts

import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { 
  TitleComponent,
  GridComponent
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'


echarts.use([
  TitleComponent,
  GridComponent,
  BarChart,
  SVGRenderer
])

export default echarts

