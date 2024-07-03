/*
 * @Date: 2024-06-21 09:31:03
 * @LastEditors: phil_litian
 */

type CachedKey = string | number;
type Timer = ReturnType<typeof setTimeout>

export interface CachedData<TData = any, TParams = any> {
  data: TData,
  params: TParams,
  time: number
}

interface RecordData extends CachedData {
  timer: Timer | undefined
}

const cache = new Map<CachedKey, RecordData>();
/**
 * 设置缓存
 * @param key 
 * @param cacheTime 
 * @param cachedData 
 */
export const setCache = (key: CachedKey, cacheTime: number, cachedData: CachedData ) => {
  const currentCache = cache.get(key)
  if ( currentCache?.timer ) {
    clearInterval(currentCache.timer)
  }
  let timer: Timer | undefined = undefined

  cache.set(key, {
    ...cachedData,
    timer
  })
}

/**
 * 设置缓存
 * @param key 
 * @returns 
 */
export const getCache = (key: CachedKey) => {
  return cache.get(key)
}

/**
 * 清除cache
 * @param key 指定需要清除的key
 */
export const clearCache = (key: string | string[]) => {
  if ( key ) {
    // 清空指定key对应的data
    const cachedKeys = Array.isArray(key) ? key : [key];
    cachedKeys.map(cacheKey => cache.delete(cacheKey))
  } else {
    cache.clear()
  }
}
