/*
 * @Date: 2024-02-26 10:07:10
 * @LastEditors: phil_litian
 */

import { set } from 'lodash-es'

/**
 * 
 * @param langs 模块
 * @param prefix 前缀
 * @returns 对象 
 * {
 *    key: value,
 *    file1: { file2: {  } }
 * }
 */
export const genMessage = (langs, prefix: string = 'lang') => {
  let obj: Recordable = {}

  Object.keys(langs).forEach(key => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.slice(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if( moduleName ) {
      if ( objKey ) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule)
      }
    }
  })
  return obj
}


