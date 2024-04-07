/*
 * @Date: 2024-04-07 10:19:18
 * @LastEditors: phil_litian
 */

import { DescriptionsProps } from "ant-design-vue"; 


export interface MyDescriptionProps extends DescriptionsProps {
  
}

export interface DescInstance {
  setDescProps(descProps: Partial<MyDescriptionProps>): void
}

