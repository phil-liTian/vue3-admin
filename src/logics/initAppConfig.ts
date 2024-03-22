/*
 * @Date: 2024-02-25 12:12:10
 * @LastEditors: phil_litian
 */

import { updateDarkTheme } from './theme/dark'
import { usePermissionsStore } from '@s/modules/permissions'
const { buildRoutesAction } = usePermissionsStore()

// 初始化app的配置
export const initAppConfig = () => {
  updateDarkTheme()

  // 刷新时动态更新一下权限
  buildRoutesAction()
}
