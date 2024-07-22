/*
 * @Date: 2024-07-12 10:06:49
 * @LastEditors: phil_litian
 */
import { isBrowser } from "./isBrowser"
import { isDocumentVisible } from "./isDocumentVisible"
import { isOnline } from "./isOnline"

type Listener = () => void
const listeners: Listener[] = []

if ( isBrowser ) {
  const revalidate = () => {
    if(!isDocumentVisible() || !isOnline()) return
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }
  }

  window.addEventListener('visiblitychange', revalidate, false)
  window.addEventListener('focus', revalidate, false)
}

// 订阅listener, 返回一个取消订阅的函数
export default function subscribe(listener: Listener) {
  listeners.push(listener)

  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    if ( index > -1) {
      listeners.splice(index, 1)
    }
  }
}
