/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { Component, App } from 'vue'
import { mergeWith, intersectionWith, unionWith, isEqual } from 'lodash-es'
import { isArray, isObject } from './is'


type customComponent = Component & { displayName?: string }

export type WithInstall<T> = T & {
  install(app: App): void
}

export const noop = () => {}

// 给组件增加install方法, 可实现全局组件注册
export const withInstall = <T extends customComponent>(component: T, alias?: string) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const componentName = component.name || component.displayName
    if ( !componentName ) return
    app.component(componentName, component)
    if( alias ) {
      app.config.globalProperties[alias] = component
    }
  }

  return component as WithInstall<T>
}

/**
 * 
 * @param baseUrl
 * @param obj 
 * @returns 
 * eg: 
 *   setObjToUrlParams('www.baidu.com', { a: 1, b: 2 }) 
 *   www.baidu.com?a=1&b=2
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = ''
  // 处理参数
  for (const key in obj) {
    parameters += `${key}=${obj[key]}&`
  }
  parameters = parameters.replace(/&$/, '')

  return /\?$/.test(baseUrl) ? `${baseUrl}${parameters}` : baseUrl.replace(/\/?$/, '?') + parameters
}

type MergeType = 'union' | 'concat' | 'replace' | 'intersection'
type DefaultType = null | undefined | object
/**
 * 递归合并两个对象
 * @param source 
 * @param target 
 * @param mergeArrays: MergeType (处理数组的策略)
 *  union 对数组进行并集操作
 *  concat 连接数据
 *  intersection 对数组进行交集操作
 *  replace 用目标数组替代原数组
 * @returns 返回合并后的对象
 */
export function deepMerge<T extends DefaultType, U extends DefaultType> (source: T, target: U, mergeArrays: MergeType = 'replace') {
  if ( !target ) {
    return source as T & U
  }

  if ( !source ) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceVal, targetVal) => {

    if ( isArray(targetVal) && isArray(sourceVal) ) {
      switch(mergeArrays) {
        case 'concat': {
          return sourceVal.contact(targetVal)
        }

        case 'replace': {
          return target
        }

        case 'intersection': {
          return intersectionWith(targetVal, sourceVal, isEqual)
        }

        case 'union': {
          return unionWith(targetVal, sourceVal, isEqual)
        }

        default: {
          throw new Error(`Unknown mergeArray strategy: ${mergeArrays}`)
        }
      }
    }

    if ( isObject(targetVal) && isObject(sourceVal) ) {
      return deepMerge(sourceVal, targetVal, mergeArrays)
    }

    // 如果customizer 返回 undefined，将会由合并处理方法代替
    return undefined
  })
}
