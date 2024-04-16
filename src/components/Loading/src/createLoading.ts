/*
 * @Date: 2024-04-16 11:37:26
 * @LastEditors: phil_litian
 */

import { VNode, createVNode, defineComponent, h, reactive, render } from 'vue';
import Loading from './Loading.vue'
import { LoadingProps } from './typing';


export function createLoading(props: Partial<LoadingProps>, target?: HTMLElement) {
  let vm: Nullable<VNode> = null
  const data = reactive({
    tip: '',
    loading: true,
    ...props
  })

  // TODO
  const loadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data })
    }
  })

  vm = createVNode(loadingWrap)
  render(vm, document.createElement('div'))

  function open(target: HTMLElement = document.body) {
    if ( !vm || !vm.el ) return

    target.appendChild(vm.el as HTMLElement)
  }

  function close() {
    if ( vm?.el?.parentNode ) {
      vm?.el?.parentNode?.removeChild(vm.el)
    }
  }

  function setLoading(loading: boolean) {
    data.loading = true
  }

  function setTip(tip: string) {
    data.tip = tip
  }
  
  if ( target ) {
    open(target)
  }

  return {
    open,
    close,
    setLoading,
    setTip
  }
}
