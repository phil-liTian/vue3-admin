/*
 * @Date: 2024-07-19 15:34:25
 * @LastEditors: phil_litian
 */
import { isBrowser } from "./isBrowser"

/**
 * 返回状态：是否是在线状态
 * @returns 
 */
export const isOnline = (): boolean => {
  if ( isBrowser && typeof navigator.onLine !== 'undefined' ) {
    return navigator.onLine
  }

  return true
}