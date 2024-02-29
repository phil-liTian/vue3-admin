/*
 * @Date: 2024-02-27 09:26:14
 * @LastEditors: phil_litian
 */
import { computed } from 'vue'
import { useLocalStoreWithout } from '@s/modules/locale'
import { i18n } from './index'
import { LocalType } from '#/config'


const setI18nLanguage = (locale: LocalType) => {
  const { setLocaleInfo } = useLocalStoreWithout()
  // 关键点: 设置i18n的语种
  i18n.global.locale = locale
  
  setLocaleInfo({ locale })
}

export const useLocale = () => {
  const { getLocale: locale } = useLocalStoreWithout()
  
  // 获取ant-design的语言文件
  const getAntdLocale = computed(() => {
    const localMessage = i18n.global?.getLocaleMessage(locale)
    return localMessage?.antdLocale || {}
  })

  // 切换语言
  const changeLocale = async (_locale: LocalType): Promise<LocalType> => {
    const globalI18n = i18n.global
    // 相同的话则无需切换
    if ( _locale === locale ) {
      return locale
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
