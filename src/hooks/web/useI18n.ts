/*
 * @Date: 2024-02-28 09:42:12
 * @LastEditors: phil_litian
 * 动态处理语言
 */
import { i18n } from '@/locales/index'

/**
 * @param namespace 命名空间 
 * @returns 
 */

type I18nTranslationParameters = [string, any]

const getKey = (namespace?: string, key?: string) => {
  if ( !namespace ) {
    return key
  }

  if ( key.startsWith(namespace) ) {
    return key
  }

  return `${namespace}.${key}`

}

export const useI18n = (namespace?: string) => {
  // 兼容一下没有i18n的场景
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    }
  }

  if ( !i18n ) {
    return normalFn
  }

  const { t, methods } = i18n.global
  
  // 可简化t的传参
  const tFn = ( key: string, ...arg: any[] ) => {
    return (t as (arg0: string, ...arg: I18nTranslationParameters ) => string)( getKey(namespace, key), ...(arg as I18nTranslationParameters) )
  }
  
  return {
    t: tFn,
    ...methods
  }
}