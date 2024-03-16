/*
 * @Date: 2024-03-11 17:24:29
 * @LastEditors: phil_litian
 */
import { isString } from '@u/is'
const toString = Object.prototype.toString
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 添加时间戳
export const joinTimeStamp = (join: boolean, restful: boolean): string | object => {
  // 兼容参数设置不需要时间戳
  if ( !join ) {
    return restful ? '' : {}
  }

  const now = new Date().getTime()
  if ( restful ) {
    return `?_t=${now}`
  }

  // join && !restful
  return { _t: now }
}

// 格式化请求参数时间
export const formatRequestDate = ( params ) => {
  if ( toString.call(params) !== '[object Object]' ) {
    return
  }

  for (const key in params) {
    const format = params[key]?.format ?? null
    if( format && typeof format === 'function' ) {
      params[key] =  params[key].format(DATE_TIME_FORMAT)
    }

    if ( isString(key) ) {
      const value = params[key]
      if ( value ) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch(err) {
          throw new Error(err)
        }
      }
    }
  }
}
