/*
 * @Date: 2024-04-09 15:38:00
 * @LastEditors: phil_litian
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

type RefsReturnType<T = HTMLElement> = {
  refs: Ref<T[]>,
  setRefs: (index: number) => void
}

export function useRefs<T = HTMLElement>(): RefsReturnType<T> {
  
  const refs = ref([]) as Ref<T[]>

  const setRefs = (index: number) => {
    // refs.value[index] = el
  }

  return {
    refs,
    setRefs
  }

}