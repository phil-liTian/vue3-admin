/*
 * @Date: 2024-03-28 19:43:54
 * @LastEditors: phil_litian
 */
import { useAppStore } from '@s/modules/app'
import { HandlerEnums } from "./enums";
import { updateSidebarBgColor } from '@/logics/theme/updateBackground'


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
  }
}