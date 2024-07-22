/*
 * @Date: 2024-07-19 15:28:26
 * @LastEditors: phil_litian
 */
import { isBrowser } from '../utils/isBrowser';
import { isDocumentVisible } from '../utils/isDocumentVisible'
import { isOnline } from '../utils/isOnline';

type Listener = () => void
const listeners: Listener[] = []

if ( isBrowser ) {
  
  const revalidate = () => {
    // 不可见或离线状态无需重新请求
    if ( !isDocumentVisible() || !isOnline() ) return
    
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }
  }

  window.addEventListener('focus', revalidate, false)
  window.addEventListener('visibilitychange', revalidate, false)
}

export default function subscribe(listener: Listener) {
  console.log('listener', listener);
  
  listeners.push(listener);

  return function unSubscribe() {
    const index = listeners.indexOf(listener);
    if ( index > -1 ) {
      listeners.splice(index, 1);
    }
  }
}
