/*
 * @Date: 2024-03-12 09:41:08
 * @LastEditors: phil_litian
 */

import { CacheTypeEnum, TOKEN_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
import { Persistent } from '../cache/Persistent'
const { permissionCacheType } = projectSetting

const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

// 获取token
export const getToken = (): string => {
  return getAuthCache(TOKEN_KEY)
}

/**
 * 获取权限相关的缓存数据
 * @param key 
 */
export function getAuthCache<T>( key ): T  {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

/**
 * 设置权限相关的缓存数据
 * @param key 
 * @param value 
 */
export function setAuthCache<T>(key, value): T{
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  
  return fn(key, value, true) as T
}

/**
 * 清空权限相关的缓存数据
 */
export const clearAuthCache = (immediate = false) : void => {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}
