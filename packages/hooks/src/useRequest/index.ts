/*
 * @Date: 2024-06-18 21:54:51
 * @LastEditors: phil_litian
 */
import { Service, UseRequestOptions, UseRequestPlugin } from './types'
import useCachePlugin from './plugins/useCachePlugin'
import { useRequestImplement } from './useRequestImplement'

export function useReqest<TData, TParams extends any[]>(
  service: Service<TData, TParams>, 
  options?: UseRequestOptions<TData, TParams>,
  plugins?: UseRequestPlugin<TData, TParams>[]) {

  return useRequestImplement<TData, TParams>(
    service, 
    options,
    [
      ...(plugins || []),
      useCachePlugin
    ] as UseRequestPlugin<TData, TParams>[]
  )
}
