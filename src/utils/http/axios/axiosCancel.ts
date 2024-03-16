/*
 * @Date: 2024-03-11 20:49:28
 * @LastEditors: phil_litian
 */
import type { AxiosRequestConfig } from 'axios'

const PendingMap = new Map<string, AbortController>()

const getPendingUrl = (config: AxiosRequestConfig) : string  => {
  return [config.url, config.method].join('&')
}

export class AxiosCancel {
  /**
   * @description 添加请求
   */
  public addPending(config: AxiosRequestConfig): void {
    const key = getPendingUrl(config)
    const controller = new AbortController()
    config.signal = config.signal || controller.signal;
    if ( !PendingMap.get(key) ) {
      PendingMap.set(key, controller)
    }
  }

  public removePending(config: AxiosRequestConfig): void {
    const key = getPendingUrl(config)
    const abortController = PendingMap.get(key)
    
    if ( abortController ) {
      abortController.abort(key)
    }
    PendingMap.delete(key)
  }
  
}
