/*
 * @Date: 2024-03-03 14:04:13
 * @LastEditors: phil_litian
 */
import { AppRouteRecordRaw } from '@/router/types'
import { PropType } from 'vue'

export const basicProps = {
  items: {
    type: Array,
    default: () => []
  }
}

// 单个导航props参数
export const itemProps = {
  item: {
    type: Object as PropType<AppRouteRecordRaw>,
    default: () => {}
  }
}

// 内容区域props参数
export const contentProps = {
  item: {
    type: Object as PropType<AppRouteRecordRaw>,
    default: () => {}
  }
}
