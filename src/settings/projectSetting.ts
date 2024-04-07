/*
 * @Date: 2024-03-16 14:01:37
 * @LastEditors: phil_litian
 */
import { CacheTypeEnum } from '@e/cacheEnum'
import { PermissionModeEnum, ThemeEnum } from '@e/appEnum'
import { ProjectConfig } from '#/config'
import { SIDE_BAR_BG_COLOR_LIST } from './designSetting'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

const setting: ProjectConfig = {
  // 用于控制缓存是在storage里面还是session里面
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  menuSetting: {
    show: true, // 是否展示导航菜单
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    accordion: false,
    mode: MenuModeEnum.INLINE,
    theme: ThemeEnum.DARK,
    type: MenuTypeEnum.SIDEBAR,
    collapsed: false
  },

  headerSetting: {
    show: true
  },

  multiTabsSetting: {
    show: true,
    cache: false,
  }
  
}

export default setting