/*
 * @Date: 2024-02-24 11:59:09
 * @LastEditors: phil_litian
 * app设置层面枚举
 */
// 主题
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light'
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  ROLE = 'ROLE', // 角色权限
  ROUTE_MAPPING = 'ROUTE_MAPPING', // 路由映射
  BACK = 'BACK' // 后端权限控制
}
