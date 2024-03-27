/*
 * @Date: 2024-03-16 14:01:37
 * @LastEditors: phil_litian
 */
import { CacheTypeEnum } from '@e/cacheEnum'
import { PermissionModeEnum, ThemeEnum } from '@e/appEnum'
import { ProjectConfig } from '#/config'
import { SIDE_BAR_BG_COLOR_LIST } from './designSetting'
import { MenuModeEnum } from '@/enums/menuEnum'

const setting: ProjectConfig = {
  // 用于控制缓存是在storage里面还是session里面
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    accordion: false,
    mode: MenuModeEnum.INLINE,
    theme: ThemeEnum.DARK
  }
  
}

export default setting