/*
 * @Date: 2024-04-07 10:57:31
 * @LastEditors: phil_litian
 */

import { ref, unref } from "vue"
import { DescInstance, MyDescriptionProps } from "./typing"
export function useDescription(props: Partial<MyDescriptionProps>) {
  const desc = ref<Nullable<DescInstance>>(null)

  const register = (instance: DescInstance) => {
    desc.value = instance
    props && instance.setDescProps(props)
  }

  const methods: DescInstance = {
    setDescProps(descProps: Partial<MyDescriptionProps>): void {
      if ( !unref(desc) ) return
      unref(desc)?.setDescProps(descProps)
    }
  }

  return [ register, methods ]
}
