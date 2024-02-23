/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { AppRouteRecordRaw } from '../types'


const LoginRoute : AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@v/sys/login/Login.vue'),
  meta: {
    title: '登录页'
  }
}

export const basicRoutes = [
  LoginRoute
]