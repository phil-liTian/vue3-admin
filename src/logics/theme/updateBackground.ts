/*
 * @Date: 2024-03-26 20:36:01
 * @LastEditors: phil_litian
 */
import { useAppStore } from '@s/modules/app'
import { setCssVar } from './utils'
import { lighten } from '@/utils/color'

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'


// 更新导航的背景色
export const updateSidebarBgColor = (color?: string) => {
  const { getProjectConfig, getMenuSetting } = useAppStore()

  color = getMenuSetting.bgColor
  
  setCssVar(SIDER_DARK_BG_COLOR, color)
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color, 5))
}

