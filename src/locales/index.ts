/*
 * @Date: 2024-02-26 09:51:24
 * @LastEditors: phil_litian
 */

import type { App } from "vue";
import { createI18n } from 'vue-i18n'
import { useLocalStoreWithout } from '@s/modules/locale'
// console.log('useLocalStore', useLocalStore);


const { getLocale } = useLocalStoreWithout()


const createI18nOptions = async () => {
  const locale = getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const messages = defaultLocale?.default?.message ?? {}
  
  return {
    locale, // 当前语言类型
    fallbackLocale: locale, // 后备的语言类型
    // messages: {
    //   'zh': {
    //     i18n: {
    //       bread: '面包',
    //       btn: '切换按钮'
    //     }
    //   },
    //   'en': {
    //     i18n: {
    //       bread: 'bread'
    //     }
    //   }
    // }
    messages: { // 不同语言环境下消息转换的对象
      [locale]: messages
    }, 
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false
  }
}

// 国际化设置
export const setUpI18n = async (app: App) => {
  const options = await createI18nOptions()
  const i18n = createI18n(options)
  app.use(i18n)
}