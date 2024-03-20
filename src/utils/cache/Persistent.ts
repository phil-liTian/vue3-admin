/*
 * @Date: 2024-03-16 10:31:48
 * @LastEditors: phil_litian
 */
import { Memory } from './Memory'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'
import { TOKEN_KEY, APP_LOCAL_CACHE_KEY } from '@e/cacheEnum'
import { createLocalStorage, createSessionStorage } from './index'

interface BasicStore {
  [TOKEN_KEY]: string | null | undefined
}

export type BasicKeys = keyof BasicStore

// Memory 是存在计算机的缓存中
const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

// localStorage
const ls = createLocalStorage()
const ss = createSessionStorage()

// 初始化缓存数据(每次刷新后都会运行)
const initPersistentMemory = () => {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  // 没有过期则重置内存中缓存的数据
  localCache && localMemory.resetCache(localCache)
}
export class Persistent {
  static setLocal(key, value, immediate = false): void {
    localMemory.set(key, value)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  static getLocal(key: BasicKeys) {
    return localMemory.get(key)?.value
  }

  static clearLocal(immediate: boolean) {
    localMemory.clear()
    immediate && ls.clear()
  }

  static setSession(key, value, immediate = false): void {
    sessionMemory.set(key, value)
    immediate && ss.set(APP_LOCAL_CACHE_KEY, sessionMemory.getCache)
  }

  static getSession(key) {
    return sessionMemory.get(key)?.value
  }

  static clearSession(immediate: boolean) {
    sessionMemory.clear()
    immediate && ss.clear()
  }
}

initPersistentMemory()

// storage发生改变
window.addEventListener('storage', () => {
  console.log('storage');
})
