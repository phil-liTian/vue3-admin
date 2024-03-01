/*
 * @Date: 2024-02-25 10:55:12
 * @LastEditors: phil_litian
 */

import type { App } from "vue";
import { PButton } from './Button/index'
import { PIcon } from './Icon/index'
import { PBasicHelp } from './Basic/index'

// 注册全局组件
export function registerGlobComps(app: App) {
  app.use(PButton).use(PIcon).use(PBasicHelp)
}