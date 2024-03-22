/*
 * @Date: 2024-03-03 14:19:25
 * @LastEditors: phil_litian
 * 动态处理路由内容
 */
import { Menu } from '@/router/types'
import { usePermissionsStore } from '@s/modules/permissions'
import { PermissionModeEnum } from '@e/appEnum'
import projectSetting from '@/settings/projectSetting'

// 是否是路由映射模式
const isRouteMappingMode = () => {
  return projectSetting.permissionMode === PermissionModeEnum.ROUTE_MAPPING
}

// 是否是角色权限模式
const isRoleMode = () => {
  return projectSetting.permissionMode === PermissionModeEnum.ROLE
}

// 是否是后端权限模式
const isBackMode = () => {
  return projectSetting.permissionMode === PermissionModeEnum.BACK
}

let staticMenu: Menu[] = []
export const getAsyncMenus = () => {
  const permissionStore = usePermissionsStore()
  // 递归过滤(key1)
  const menuFilter = (items) => {
    return items.filter(item => {
      const show = !item.meta?.hideMenu && !item.hideMenu
      if ( item.children?.length ) {
        item.children =  menuFilter(item.children)
      }
      return show
    })
  }
  
  if ( isRouteMappingMode() ) {
    return menuFilter(permissionStore.getFrontMenuList)
  }

  if ( isBackMode() ) {
    return menuFilter(permissionStore.getBackMenuList)
  }

  return staticMenu
}

// 处理3种权限模式: 角色、前端、后端
export const getMenus = async () => {
  if ( isRoleMode() ) {
    return []
  }

  const menus = await getAsyncMenus()
  console.log('menus', menus);
  
  

  return menus
}

