/*
 * @Date: 2024-02-24 11:59:09
 * @LastEditors: phil_litian
 * app设置层面枚举
 */
export const SIDER_BAR_MINI_WIDTH = 48;
export const SIDER_BAR_SHOW_TITLE_MINI_WIDTH = 80;

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


// 路由切换动画
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
