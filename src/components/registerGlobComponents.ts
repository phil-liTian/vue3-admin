/*
 * @Date: 2024-02-25 10:55:12
 * @LastEditors: phil_litian
 */

import type { App } from "vue";
import { PButton } from './Button/index'
import { PIcon } from './Icon/index'
import { PBasicHelp } from './Basic/index'
import { PBasicTitle } from "./Basic/index";
import { PageWrapper } from './page/index'
import { PCountTo } from './PBase/CountTo/index'
import { PDrawer } from './PBase/Drawer/index'
import { PScrollContainer } from './PBase/Container/index'

// 注册全局组件
export function registerGlobComps(app: App) {
  app.use(PButton).use(PIcon).use(PBasicHelp).use(PBasicTitle).use(PageWrapper).use(PCountTo).use(PDrawer).use(PScrollContainer)
}
