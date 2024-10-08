/*
 * @Date: 2024-06-18 21:54:51
 * @LastEditors: phil_litian
 */
import { Service, UseRequestOptions, UseRequestPlugin } from './types'
import useCachePlugin from './plugins/useCachePlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'
import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelay'
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin'
import { useRequestImplement } from './useRequestImplement'
import useRetryPlugin from './plugins/useRetryPlugin'

export function useReqest<TData, TParams extends any[]>(
  service: Service<TData, TParams>, 
  options?: UseRequestOptions<TData, TParams>,
  plugins?: UseRequestPlugin<TData, TParams>[]) {

  return useRequestImplement<TData, TParams>(
    service, 
    options,
    [
      ...(plugins || []),
      usePollingPlugin,
      useCachePlugin,
      useAutoRunPlugin,
      useDebouncePlugin,
      useThrottlePlugin,
      useLoadingDelayPlugin,
      useRetryPlugin,
      useRefreshOnWindowFocusPlugin
    ] as UseRequestPlugin<TData, TParams>[]
  )
}
