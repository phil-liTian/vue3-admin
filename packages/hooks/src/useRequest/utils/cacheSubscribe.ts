/*
 * @Date: 2024-06-26 11:51:15
 * @LastEditors: phil_litian
 */

type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {}

export const trigger = (key: string | number, data: any) => {
  if ( listeners[key] ) {
    listeners[key].map(listener => listener(data))
  }
}

/**
 * 订阅: 一个key可以订阅多个listener
 * @param key 
 * @param listener 
 * @returns 取消订阅的函数, 调用后可取消订阅, trigger则不会执行当前订阅的方法
 */
export const subscribe = (key: string | number, listener: Listener) => {
  if( !listeners[key] ) {
    listeners[key] = []
  }
  listeners[key].push(listener)

  return function unSubscribe() {
    const index = listeners[key].indexOf(listener)
    listeners[key].splice(index, 1)
  }
}
