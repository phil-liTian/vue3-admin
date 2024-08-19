/*
 * @Date: 2024-03-02 17:15:43
 * @LastEditors: phil_litian
 */
import type { UserInfo } from '#/store'
import { RoleEnum } from '@e/roleEnum'
import { PageEnum } from '@e/pageEnum'
import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { usePermissionsStore } from './permissions'
import { loginApi, getUserInfo, doLogout } from '@a/sys/user'
import { TOKEN_KEY, USER_INFO_KEY, ROLES_KEY } from '@e/cacheEnum'
import { setAuthCache, getAuthCache } from '@u/auth/index'
import { isArray } from '@u/is'
import { store } from '..';

export const useUserStore = defineStore({
  id: 'app-user',

  state: () => {
    return {
      token: '',
      roleList: [], // 角色列表数据
      userInfo: null,
    }
  },
  
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache(USER_INFO_KEY) || {}
    },

    getToken(state): string {
      return state.token || getAuthCache(TOKEN_KEY) || ''
    },

    getRoleList(state): any[] {
      return state.roleList?.length ? state.roleList : (getAuthCache(ROLES_KEY) || [])
    }
  },

  actions: {
    // 设置token
    setToken(info: string | undefined) {
      this.token = info ?? ''
      setAuthCache(TOKEN_KEY, this.token)
    },

    // 设置会员信息
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      setAuthCache(USER_INFO_KEY, info)
    },

    setRoleList(roles: RoleEnum[]) {
      this.roleList = roles
      console.log('roles', roles);
      
      setAuthCache(ROLES_KEY, roles)
    },

    // 登录
    async login(LoginParams) {
      try {
        const res = await loginApi(LoginParams)
        const { token } = res
        this.setToken(token)
        // 登录后 返回登录的对象
        return this.afterLoginAction()
      } catch(err) {
        Promise.reject(err)
      }
    },

    // 登录之后返回用户信息
    async afterLoginAction() {
      const { buildRoutesAction } = usePermissionsStore()
      const routes = buildRoutesAction()
      
      routes.forEach(route => {
        router.addRoute(route as RouteRecordRaw)
      })
      
      const userInfo = await this.getUserInfoAction()

      router.replace('/dashBoard')
    },

    // 获取用户信息(获取到之后缓存用户信息及角色信息)
    async getUserInfoAction () {
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      console.log('roles', roles);
      
      if ( isArray(roles) ) {
        const roleList = roles.map(v => v.value)
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }

      this.setUserInfo(userInfo)
      return userInfo
    },

    // 退出登录
    async layout(goLogin = false) {
      if ( this.getToken ) {
        try {
          await doLogout()
        } catch(err) {
          console.log('注销token失败');
        }
      }
      // 清空token和用户信息
      this.setToken(undefined)
      this.setUserInfo(null)

      if ( goLogin ) {
        // 返回登录页
        router.replace(PageEnum.BASIC_LOGIN)
      } else {
        // 回登录页 带上当前路由地址(可用于登录后直接返回当前浏览页)

      }
    },

    /**
     * @description: 询问是否确认退出登录
     */
    confirmLoginOut() {

    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
