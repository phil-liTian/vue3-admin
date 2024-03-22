/*
 * @Date: 2024-02-27 09:26:14
 * @LastEditors: phil_litian
 */
import { computed, unref } from 'vue'
import { useLocalStoreWithout } from '@s/modules/locale'
import { i18n } from './index'
import { LocalType } from '#/config'


const setI18nLanguage = (locale: LocalType) => {
  const { setLocaleInfo } = useLocalStoreWithout()
  // 关键点: 设置i18n的语种
  i18n.global.locale = locale
  
  setLocaleInfo({ locale })
}
/**
 * 当前hook作用： 1.获取antdesign的多语言配置 2.切换语言 3. 获取当前语言
 * @returns 
 */
export const useLocale = () => {
  // 如果直接解构的话 在执行完useLocale之后，此处的locale不会动态更新 故舍弃当前做法
  // const { getLocale: locale } = useLocalStoreWithout()

  const localStore = useLocalStoreWithout()
  const locale = computed(() => localStore.getLocale)

  // 获取ant-design的语言文件
  const getAntdLocale = computed(() => {
    const localMessage = i18n.global?.getLocaleMessage(locale)
    return localMessage?.antdLocale || {}
  })

  // 切换语言
  const changeLocale = async (_locale: LocalType): Promise<LocalType> => {
    const globalI18n = i18n.global
    // 相同的话则无需切换
    
    if ( _locale === unref(locale) ) {
      return _locale
    }

    // TODO: loadLocalePool

    // 没有对应的语言模块 则切换无效
    const langModule = (await import(`./lang/${_locale}.ts`) as any).default
    
    if ( !langModule ) return
    const { message } = langModule
    globalI18n.setLocaleMessage(_locale, message)
    
    setI18nLanguage(_locale)

    return _locale
  }

  return {
    locale,
    getAntdLocale, // 获取ant-design的语言文件
    changeLocale // 切换语言
  }
}
