/*
 * @Date: 2024-02-24 17:25:28
 * @LastEditors: phil_litian
 */

import { LocalSetting, LocalType } from "#/config"


export const LocaleList = [
  {
    text: '简体中文'
  },
  {
    text: 'English'
  },
]

export const LOCALE: { [key: string]: LocalType } = {
  ZH_CN: 'zh-CN',
  EN: 'en'
}

// locale的默认配置
export const localeSetting: LocalSetting = {
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN
}