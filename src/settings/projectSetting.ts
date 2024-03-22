/*
 * @Date: 2024-03-16 14:01:37
 * @LastEditors: phil_litian
 */
import { CacheTypeEnum } from '@e/cacheEnum'
import { PermissionModeEnum } from '@e/appEnum'

const setting = {
  // 用于控制缓存是在storage里面还是session里面
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING
  
}

export default setting