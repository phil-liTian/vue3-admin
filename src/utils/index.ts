/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { Component, App } from 'vue'


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
