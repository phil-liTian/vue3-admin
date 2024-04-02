/*
 * @Date: 2024-03-28 19:42:06
 * @LastEditors: phil_litian
 */

import { useI18n } from '@h/web/useI18n'
import { MenuModeEnum, MenuTypeEnum } from "@/enums/menuEnum";

const { t } = useI18n('layout') 
export enum HandlerEnums {
  MENU_THEME = 1
}

export const menuTypeListEnum = [
  {
    title: t('setting.menuTypeSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: t('setting.menuTypeMixSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR
  },
  {
    title: t('setting.menuTypeTopMenu'),
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.TOP_MENU
  },
  {
    title: t('setting.menuTypeMix'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX
  }
]
