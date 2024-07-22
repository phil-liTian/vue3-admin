/*
 * @Date: 2024-07-12 09:57:01
 * @LastEditors: phil_litian
 */

import { isBrowser } from "./isBrowser"

// 当前文档内容是否可见（切换浏览器tab之后为不可见）
export const isDocumentVisible = () => {
  if ( isBrowser ) {
    return document.visibilityState !== 'hidden'
  }
  
  return true
}