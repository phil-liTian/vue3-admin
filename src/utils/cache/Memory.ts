/*
 * @Date: 2024-03-16 10:34:06
 * @LastEditors: phil_litian
 */
import projectSetting from '@/settings/projectSetting'

export interface Cache<V = any> {
  value?: V,
  timeoutId: ReturnType<typeof setTimeout>,
  time?: string,
  alive?: number
}

const NOT_ALIVE = 0;

/**
 * 缓存在内存中思路如下：
 * 1. 给每一个缓存的数据增加定时器, 一旦过期就清除
 * 2. 当缓存的时候 需要更新时 清除原有定时器，给当前数据一个新定时器 有利于直接从缓存中获取数据
 * 
 * 
 * value: 缓存的值
 * timeoutId: 缓存数据定时器id
 * alive: 缓存时长
 * time: 
 */

export class Memory <T = any>{
  private cache = {};
  private alive: number;

  constructor(alive = NOT_ALIVE) {
    this.alive = alive * 1000
  }

  get getCache() {
    return this.cache
  }

  setCache(value) {
    this.cache = value
  }

  get(key) {
    return this.cache[key]
  }

  set(key, value, expires?: number) {
    let item = this.get(key)
    // 默认过期时间为alive
    if ( !expires || expires <= 0 ) {
      expires = this.alive
    }

    if ( item ) {
      // 缓存中已有该数据
      // 如果过期了 就去除定时器
      if( item.timeoutId ) {
        clearTimeout(item.timeoutId)
        item.timeoutId = undefined
      }
      // 更新value
      item.value = value
    } else {
      // 没有该数据 则缓存下来
      item = { value, alive: expires }
      this.cache[key] = item
    }

    // 没有设置过期的话 就直接返回当前value
    if ( !expires ) {
      return value
    }

    const now = new Date().getTime();
    item.time = expires > now ? expires : expires + now;

    item.timeoutId = setTimeout(() => {
      this.remove(key)
    }, expires > now ? expires - now : expires)

    return value
  }

  // 重置缓存
  resetCache(cache) {
    Reflect.ownKeys(cache).forEach(key => {
      const item = cache[key]
      if ( item?.time ) {
        const now = new Date().getTime()
        const expires = item.time
        if ( expires > now ) {
          this.set(key, item.value, expires)
        }
      }
    })
  }

  // 移除
  remove(key) {
    const item = this.get(key)
    Reflect.deleteProperty(this.cache, key)

    // 返回异常的值
    if( item ) {
      item.timeoutId && clearTimeout(item.timeoutId)
      return item.value
    }
  }

  // 清空缓存 不仅要清空cache 更要清除timeoutId 防止内存泄漏
  clear() {
    Reflect.ownKeys(this.cache).forEach(key => {
      const item = this.cache[key]
      item.timeoutId && clearTimeout(item.timeoutId)
    })

    this.cache = {}
  }
}
