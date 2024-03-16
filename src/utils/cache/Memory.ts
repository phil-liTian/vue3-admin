/*
 * @Date: 2024-03-16 10:34:06
 * @LastEditors: phil_litian
 */
import projectSetting from '@/settings/projectSetting'

export class Memory {
  private cache
  private alive: number;

  constructor(alive) {
    this.alive = alive * 1000
  }

  get(key) {
    return this.cache[key]
  }

  set(key, value, expires?: number) {
    console.log('key, value, expires', key, value, expires);
    let item = this.get(key)
    if ( item ) {
      // 缓存中已有该数据
      

    } else {
      // 没有该数据 则缓存下来
      item = { value, alive: expires }
      this.cache[key] = item
    }

    return value
  }
}
