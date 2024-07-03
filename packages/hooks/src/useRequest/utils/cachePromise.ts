/*
 * @Date: 2024-06-19 21:29:37
 * @LastEditors: phil_litian
 */
/**
 * 缓存当前的promise
 */

type CacheKey = string | number
const cachePromise = new Map<CacheKey, Promise<any>>();

export const getCachePromise = cacheKey => {
  return cachePromise.get(cacheKey)
}

export const setCachePromise = (cacheKey: CacheKey, promise: Promise<any>) => {
  cachePromise.set(cacheKey, promise)
}
