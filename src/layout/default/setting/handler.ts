/*
 * @Date: 2024-03-28 19:43:54
 * @LastEditors: phil_litian
 */
import { useAppStore } from '@s/modules/app'
import { useMenuSetting } from '@h/setting/useMenuSetting'
import { HandlerEnums } from "./enums";
import { updateSidebarBgColor } from '@/logics/theme/updateBackground'
const { toggleCollpased } = useMenuSetting()



export function baseHandler(event: HandlerEnums, value: any) {
  const appStore = useAppStore()
  const config = handler(event, value)
  
  appStore.setProjectConfig(config)
}

export function handler(event, value) {
  switch(event) {
    case HandlerEnums.MENU_THEME: {
      updateSidebarBgColor(value)
      return { menuSetting: { bgColor: value } }
    }
    case HandlerEnums.MENU_COLLAPSED: {
      toggleCollpased()
      return { menuSetting: { collapsed: value } }
    }
    case HandlerEnums.HEADER_SHOW_SEARCH: {
      return { headerSetting: { showSearch: value } }
    }
    case HandlerEnums.SHOW_BREADCRUMB: {
      return { showBreadCrumb: value }
    }
    case HandlerEnums.SHOW_BREADCRUMB_ICON: {
      return { showBreadCrumbIcon: value }
    }
    // =========root============


    // =========tabs============
    case HandlerEnums.TABS_SHOW: {
      return { multiTabsSetting: { show: value } }
    }

    // =========header============



    // =========transition============
  }
}
