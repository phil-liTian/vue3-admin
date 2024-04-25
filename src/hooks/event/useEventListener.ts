/*
 * @Date: 2024-03-26 16:34:39
 * @LastEditors: phil_litian
 */
import { Ref, ref, unref, watch } from "vue"
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Window | Ref<Element | undefined> | any,
  name: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
  autoRemove?: boolean,
  isDebounce?: boolean, //防抖
  wait?: number
}

export const useEventListener = ({ el = window, name, listener, options, autoRemove = false, isDebounce = true, wait = 80 }: UseEventParams): { removeEvent: RemoveEventFn } => {
  let remove: RemoveEventFn = () => {}
  let isAddRef = ref(false) // 标识是否已添加事件
  
  if (el) {
    const element = ref(el)
    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)

    const realHandler = wait ? handler : listener

    const addEventListener = (el: Element) => el.addEventListener(name, realHandler, options)

    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }

    const removeWatch = watch(()=> element, (v, _ov, cleanUp) => {
      if ( v ) {
        !unref(isAddRef) && addEventListener(unref(v))
        cleanUp(() => {
          autoRemove && removeEventListener(unref(v))
        })
      }
    }, { immediate: true })

    remove = () => {
      removeEventListener(el)
      removeWatch()
    }
  }



  return { removeEvent: remove }
}
