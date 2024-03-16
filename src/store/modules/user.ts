/*
 * @Date: 2024-03-02 17:15:43
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { usePermissions } from './permissions'
import { loginApi, getUserInfo, doLogout } from '@a/sys/user'
import { TOKEN_KEY } from '@e/cacheEnum'
import { setAuthCache } from '@u/auth/index'

export const useUserStore = defineStore({
  id: 'app-user',

  state: () => {
    return {
      token: ''
    }
  },
  
  getters: {
    
  },

  actions: {
    // 设置token
    setToken(info: string | undefined) {
      this.token = info ?? ''
      setAuthCache(TOKEN_KEY, this.token)
    },

    async login(LoginParams) {
      const { buildRoutesAction } = usePermissions()
      const routes = buildRoutesAction()

      try {
        const res = await loginApi(LoginParams)
        console.log('res', res);
        const { token } = res

        this.setToken(token)
        // 登录后 返回登录的对象
        return this.afterLoginAction()
      } catch(err) {
        
      }
      
      

      // routes.forEach(route => {
      //   router.addRoute(route as RouteRecordRaw)
      // })

      // router.replace('/dashBoard')
    },

    // 登录之后返回用户信息
    async afterLoginAction() {
      const res = await this.getUserInfoAction()
      console.log('res', res);
    },

    // 获取用户信息
    async getUserInfoAction () {
      const res = await getUserInfo()
      console.log('res', res);
    },

    // 退出登录
    async layout() {
      const res = await doLogout()
      console.log('res-->', res);
    }
  }
})