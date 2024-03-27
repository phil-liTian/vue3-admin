/*
 * @Date: 2024-02-25 12:12:10
 * @LastEditors: phil_litian
 */

import { updateDarkTheme } from './theme/dark'
import { updateSidebarBgColor } from './theme/updateBackground'
import { usePermissionsStore } from '@s/modules/permissions'
import projectSetting from '@/settings/projectSetting'
import { useAppStore } from '@s/modules/app'

const { buildRoutesAction } = usePermissionsStore()

// 初始化app的配置
export const initAppConfig = () => {
  // 初始化projectConfig
  initProjectConfig()

  // 更新主题
  updateDarkTheme()

  // 更新sidebar的背景色
  updateSidebarBgColor()

  // 刷新时动态更新一下权限
  buildRoutesAction()
}


function initProjectConfig() {
  const { setProjectConfig } = useAppStore()
  // 先读缓存

  setProjectConfig(projectSetting)
}