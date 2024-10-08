/*
 * @Date: 2024-02-25 10:55:12
 * @LastEditors: phil_litian
 */

import type { App } from "vue";
import { PButton, PPopConfirmButton } from './Button/index'
import { PIcon } from './Icon/index'
import { PBasicHelp } from './Basic/index'
import { PBasicTitle } from "./Basic/index";
import { PageWrapper } from './page/index'
import { PCountTo } from './PBase/CountTo/index'
import { PDrawer } from './PBase/Drawer/index'
import { PScrollContainer, PCollapseContainer } from './PBase/Container/index'
import { PSwitch } from './PBase/Switch/index'
import { PSelect } from './PBase/Select/index'
import { PDropdown } from './PBase/DropDown/index'
import { PDescription } from './PBase/Description/index'
import { PBasicModal } from './PBase/Modal/index'
import { PBasicTable } from './PBase/Table/index'
import { PBasicForm } from './PBase/Form/index'
import { PBasicUpload } from './PBase/Upload/index'
import { PAuthority } from "./PBase/Authority";
 
// 注册全局组件
export function registerGlobComps(app: App) {
  app.use(PButton).use(PPopConfirmButton).use(PIcon).use(PBasicHelp).use(PBasicTitle).use(PageWrapper).use(PCountTo).use(PDrawer).use(PScrollContainer).use(PCollapseContainer).use(PSwitch).use(PSelect).use(PDropdown).use(PDescription).use(PBasicModal).use(PBasicForm).use(PBasicTable).use(PBasicUpload).use(PAuthority)
}
