import type { AppRouteRecordRaw } from '../types'


const LoginRoute : AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('../../views/sys/login/Login.vue'),
  meta: {
    title: '登录页'
  }
}

export const basicRoutes = [
  LoginRoute
]