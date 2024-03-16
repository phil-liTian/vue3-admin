/*
 * @Date: 2024-03-04 11:50:17
 * @LastEditors: phil_litian
 */

export type ErrorMessageMode = 'modal' | 'message' | undefined

export interface RequestOptions {
  formatDate?: boolean,
  joinTime?: boolean,
  isReturnNativeResponse?: boolean, // 是否是要返回原生的响应数据
  isTransformResponse?: boolean,
  withToken?: boolean,  // 请求头是否携带token
  errorMessageMode?: 'modal' | 'message',
  joinPrefix?: boolean,
  urlPrefix?: string,
  apiUrl?: string,
  joinParamsToUrl: boolean
}

export interface Result<T = any>  {
  code: number,
  type: 'warning' | 'success' | 'error',
  message: string,
  result: T
}


