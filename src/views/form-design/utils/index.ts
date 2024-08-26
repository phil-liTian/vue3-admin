import { uniqueId } from 'lodash-es'
import { IVFormComponent } from '../typings/v-form-component';
import { isArray, isNumber } from '@/utils/is';

// 驼峰转下划线
export function toLine(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 生成key
export function generateKey(schema?: IVFormComponent): string | boolean {
  if ( schema && schema.component ) {
    const key =  uniqueId(`${toLine(schema.component)}_`)
    schema.key = key
    schema.field = key

    return true
  }

  return uniqueId('key_')
}

// 移除数组中指定元素
export function remove<T>(array: Array<T>, value: number | ((item: T, index: number) => boolean)) {
  let removeVal: Array<T | undefined> = []
  if ( !isArray(array) ) return undefined

  if ( isNumber(value) ) {
    removeVal = array.splice((value as number), 1)
  } else {
    const index = array.findIndex((value as any))
    if ( index !== -1 ) {
      removeVal = array.splice(index, 1)
    }
  }

  return removeVal.shift()
}
