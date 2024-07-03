/*
 * @Date: 2024-06-19 21:21:37
 * @LastEditors: phil_litian
 */
import { ref, watchEffect } from 'vue'
import { getCachePromise, setCachePromise } from '../utils/cachePromise'
import { UseRequestPlugin } from "../types"
import { CachedData, getCache, setCache } from '../utils/cache'
import { trigger, subscribe } from '../utils/cacheSubscribe'

const useCachePlugin: UseRequestPlugin<any, any[]> = (
  fetchInstance, 
  { 
    cacheKey,
    cacheTime = 5 * 60 * 1000, // 
    staleTime = 0, // -1时 代表不过期
    setCache: customSetCache,
    getCache: customGetCache
  }) => {
  // cacheSubscribe中subscribe返回的unSubscribe方法
  const unSubscribeRef = ref<() => void>()
  const currentPromiseRef = ref<Promise<any>>()

  const _setCache = (key: string | number, cacheData: CachedData) => {
    customSetCache ? customSetCache(cacheData) : setCache(key, cacheTime, cacheData);
    trigger(cacheKey, cacheData.data)
  }

  const _getCache = (key: string | number, params: any[]) => {
    return customGetCache ? customGetCache(params) : getCache(key)
  }

  watchEffect(() => {
    if ( !cacheKey ) return
  })

  if ( !cacheKey ) {
    return {}
  }

  return {
    onBefore: (params) => {
      const cachedData = _getCache(cacheKey, params);
      if ( staleTime === -1 || new Date().getTime() - cachedData.time <= staleTime ) {
        return {
          data: cachedData?.data,
          loading: false,
          error: undefined,
          returnNow: true
        }
      } else {
        return { data: cachedData?.data, error: undefined }
      }
    },

    onRequest: (service, args) => {
      let servicePromise = getCachePromise(cacheKey)

      if ( servicePromise && currentPromiseRef.value !== servicePromise ) {
        return { servicePromise }
      }
      servicePromise = service(...args)
      setCachePromise(cacheKey, servicePromise)
      currentPromiseRef.value = servicePromise
      return {
        servicePromise
      }
    },

    onSuccess: (data, params) => {
      if ( cacheKey ) {
        _setCache(cacheKey, { data, params, time: Date.now() })

        unSubscribeRef.value = subscribe(cacheKey, d => {
          fetchInstance.setState({ data: d })
        })
      }
    },

    onMutate: data => {
      if ( cacheKey ) {
        
      }
    }
  }
}

export default useCachePlugin