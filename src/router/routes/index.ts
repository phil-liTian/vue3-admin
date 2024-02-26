/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { PageEnum } from '@/enums/pageEnum'
import { mainOut } from './mainOut'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import type { AppRouteRecordRaw } from '../types'

// 根页面
const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: PageEnum.BASIC_LOGIN,
  meta: {
    title: 'Root'
  }
}

// 登录页
const LoginRoute : AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@v/sys/login/Login.vue'),
  meta: {
    title: '登录页'
  }
}

export const basicRoutes = [
  LoginRoute,
  RootRoute,
  mainOut,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE
]