import { Ref } from "vue"

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Window | Ref<Element | undefined> | any,
  name: string,
  listener: EventListener
}

export const useEventListener = ({ el = window, name, listener }: UseEventParams): { removeEvent: RemoveEventFn } => {
  let removeEvent: RemoveEventFn = () => {}
  if (el) {
    el.addEventListener(name, listener)

    
  }


  return { removeEvent }
}
