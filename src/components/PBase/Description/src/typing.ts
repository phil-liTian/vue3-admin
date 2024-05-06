/*
 * @Date: 2024-04-07 10:19:18
 * @LastEditors: phil_litian
 */

import { DescriptionsProps } from "ant-design-vue"; 
import { VNode } from "vue";


export interface MyDescriptionProps extends DescriptionsProps {
  // 每行配置
  schema: DescItem[],

  // data
  data: Recordable,
  
}

// 描述组件实例
export interface DescInstance {
  setDescProps(descProps: Partial<MyDescriptionProps>): void
}

export interface DescItem {
  label: string,
  field: string,
  render?: () => VNode
}
