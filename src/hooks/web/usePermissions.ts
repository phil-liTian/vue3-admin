import { intersection } from 'lodash-es'
import { PermissionModeEnum } from '@/enums/appEnum'
import { RoleEnum } from '@/enums/roleEnum'
import { resetRouter, router } from '@/router'
import { usePermissionsStore } from '@s/modules/permissions'
import { isArray } from '@/utils/is'
import { useAppStore } from '@s/modules/app'
import { useUserStore } from '@s/modules/user'
import { RouteRecordRaw } from 'vue-router'

export function usePermissions() {
  const appStore = useAppStore()
  const userStore = useUserStore()
  const permissionsStore = usePermissionsStore()

  // 切换权限模式
  const togglePermissionMode = () => {
    
    appStore.setProjectConfig({
      permissionMode: appStore.getProjectConfig.permissionMode !== PermissionModeEnum.BACK ? PermissionModeEnum.BACK : PermissionModeEnum.ROUTE_MAPPING
    })

    location.reload()
  }

  const hasPermission = (values: string | string[] | RoleEnum | RoleEnum[], def = true) => {
    if ( !values ) {
      return def
    }

    const { permissionMode } = appStore.getProjectConfig
    // 前端权限
    if ( [ PermissionModeEnum.ROLE, PermissionModeEnum.ROUTE_MAPPING ].includes(permissionMode) ) {
      if ( !isArray(values)) {
        return userStore.getRoleList.includes(values)
      }
      // 有交集 则有操作权限
      return intersection(values, userStore.getRoleList).length > 0
    }
  }

  // 重新加载路由
  const resume = () => {
    // todo: 重载路由逻辑？？？
    resetRouter()

    // 重新根据角色权限加载路由
    // const routes = permissionsStore.buildRoutesAction();
    // routes.map(route => {
    //   router.addRoute(route as unknown as RouteRecordRaw)
    // })
  }

  // 修改角色类型
  const changeRole = (values: RoleEnum | RoleEnum[] | string | string[]) => {
    if ( appStore.getProjectConfig.permissionMode === 'BACK' ) {
      return
    }

    if ( !isArray(values) ) {
      values = [values as RoleEnum]
    }
    
    userStore.setRoleList(values as RoleEnum[])
    resume()
  }

  return {
    togglePermissionMode,
    hasPermission,
    changeRole
  }
}