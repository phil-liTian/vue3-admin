/*
 * @Date: 2024-06-19 13:24:03
 * @LastEditors: phil_litian
 */
import { onMounted, onUnmounted, toRefs } from 'vue'
import Fetch from "./Fetch";
import { Service, UseRequestOptions, UseRequestPlugin } from "./types";

export function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>, 
  options: UseRequestOptions<TData, TParams> = {},
  plugins: UseRequestPlugin<TData, TParams>[]) {
  const { manual = false, ...res } = options
  const fetchOptions = { manual, ...res }
  
  const fetchInstance = new Fetch(service, fetchOptions)
  // 这样一来 pluginImpls中的元素就是一个一个的对象了 在runAsync方法中就可以直接调用servicePromise
  fetchInstance.pluginImpls = plugins.map(p => p(fetchInstance, fetchOptions))
  
  onMounted(() => {
    if ( !manual ) {
      // 自动运行
      const params = fetchInstance.state.params || options.defaultParams || []
      // @ts-ignore
      fetchInstance.run(...params)
    }
  }) 

  onUnmounted(() => {

  })

  return {
    ...toRefs(fetchInstance.state),
    run: fetchInstance.run.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    cancel: fetchInstance.cancel.bind(fetchInstance),
  }
}
