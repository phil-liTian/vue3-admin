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

// 返回分页内容
export const resultPageSuccess = <T>(page: number, pageSize: number, list: T[], { message = 'ok' } = {}) => {
  const pageData = pagination(page, pageSize, list)
  return {
    ...resultSuccess({
      items: pageData,
      total: list.length
    }, { message })
  }
}

function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * pageSize
  return offset + pageSize > array.length ? array.slice(offset) : array.slice(offset, offset + pageSize)
}

// 获取请求头中的token
export const getRequestToken = ({ headers } : requestParams ) : string | undefined => {
  return headers?.authorization
}

