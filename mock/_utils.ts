/*
 * @Date: 2024-03-09 16:41:29
 * @LastEditors: phil_litian
 */
import { ResultEnum } from '../src/enums/httpEnum'

interface requestParams {
  headers?: { authorization: string }
}

// 请求成功
export const resultSuccess = <T>(result: T, { message = 'ok' } = {}) => {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: 'success'
  }
}

// 请求失败
export const resultError = <T>( message = 'Request Failed', { result = {} } = {}) => {
  return {
    code: ResultEnum.ERROR,
    result,
    message,
    type: 'error'
  }
}

// 获取请求头中的token

export const getRequestToken = ({ headers } : requestParams ) : string | undefined => {
  console.log('headers?.authorization', headers?.authorization);
  
  return headers?.authorization
}

