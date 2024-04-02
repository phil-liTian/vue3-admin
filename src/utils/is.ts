/*
 * @Date: 2024-03-11 09:43:09
 * @LastEditors: phil_litian
 */

export {
  isFunction,
  isString,
  isNil, // 检查数据是否是null或者undefined
  isArray,
  isNumber
} from 'lodash-es'

const toString = Object.prototype.toString
const is = (val, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

// 判断是否是对象
export const isObject = (val) => {
  return val !== null && is(val, 'Object')
}