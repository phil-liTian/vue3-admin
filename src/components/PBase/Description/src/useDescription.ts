/*
 * @Date: 2024-04-07 10:57:31
 * @LastEditors: phil_litian
 */

import { DescInstance, MyDescriptionProps } from "./typing"

export function useDescription() {
  
  const register = () => {
    return ''
  }

  // 抛出去的方法
  const methods: DescInstance = {
    setDescProps(descProps: Partial<MyDescriptionProps>) {
      
    }
  }

  return [ register, methods ]
  
}
