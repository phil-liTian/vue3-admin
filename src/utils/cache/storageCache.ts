/*
 * @Date: 2024-03-19 16:34:41
 * @LastEditors: phil_litian
 */
import { isNil } from '@u/is'

export interface CreateStorageParams {
  prefixKey?: string,
  storage: Storage
}

export const createStorage = ({ prefixKey = '', storage = sessionStorage }: Partial<CreateStorageParams> = {}) => {
  
  class WebStorage {
    private storage: Storage
    private prefixKey: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    getkey (key) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key, value, expire: number | null = null) {
      const strifyData = JSON.stringify({
        value,
        time: Date.now(),
        expire: isNil(expire) ? null : Date.now() + expire * 1000
      })
      
      storage.setItem(this.getkey(key) , strifyData)
    }

    get(key: string, def = null): any {
      const val = this.storage.getItem(this.getkey(key))
      if ( !val ) return def

      try {
        const data = JSON.parse(val)
        const { value, expire } = data
        // 没有设置过期时间 或者已过期
        if ( isNil(expire) || expire >= new Date().getTime()) {
          return value
        }
        
        // 设置了过期时间 切已过期, 则移除缓存在应用中的数据
        this.remove(key)
      } catch(err) {
        return def
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getkey(key))
    }

    clear() {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
