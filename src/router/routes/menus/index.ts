/*
 * @Date: 2024-03-03 14:19:25
 * @LastEditors: phil_litian
 * 动态处理路由内容
 */
import { usePermissions } from '@s/modules/permissions'


export const getAsyncMenus = () => {
  const { buildRoutesAction } = usePermissions()

  return buildRoutesAction()
}

export const getMenus = async () => {
  const menus = await getAsyncMenus()

  return menus
}

