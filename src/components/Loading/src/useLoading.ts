/*
 * @Date: 2024-04-16 11:43:48
 * @LastEditors: phil_litian
 */
import { unref, Ref } from 'vue'
import { createLoading } from './createLoading'
import { LoadingProps } from './typing'

interface UseLoadingOptions {
  target?: any,
  props?: Partial<LoadingProps>
}

export function useLoading(props: Partial<LoadingProps>): [Fn, Fn, (string) => void]
export function useLoading(opts: Partial<UseLoadingOptions>): [Fn, Fn, (string) => void]
export function useLoading(opt: Partial<LoadingProps> | Partial<UseLoadingOptions>): [Fn, Fn, (string) => void] {

  let props: Partial<LoadingProps>
  let target: HTMLElement | Ref<ElRef> = document.body
  
  if ( Reflect.has(opt, 'target') || Reflect.has(opt, 'props') ) {
    const options = opt as Partial<UseLoadingOptions>
    props = options.props || {}
    
    target = options.target || document.body
  }
  

  const instance = createLoading(props)

  function open() {
    const t = unref(target as Ref<ElRef>)

    if ( !t ) return
    instance.open(t)
  }

  function close() {
    instance.close()
  }

  function setTip(tip: string) {
    instance.setTip(tip)
  }
  

  return [open, close, setTip]
}
