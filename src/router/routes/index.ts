/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { PageEnum } from '@/enums/pageEnum'
import { mainOut } from './mainOut'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import type { AppRouteRecordRaw } from '../types'
import { router } from '..'

let routeModuleList: AppRouteRecordRaw[] = []
// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

Object.keys(modules).forEach(key => {
  const mod = (modules as Recordable)[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 亮点: 与之前处理方式不同的 可有效避免角色权限不足仍可访问无权限页面的问题, routes根据role动态渲染
export const asyncRoutes = [ ...routeModuleList, PAGE_NOT_FOUND_ROUTE ]
console.log('asyncRoutes', asyncRoutes);

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
  // ...asyncRoutes,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE
]

console.log('basicRoutes', basicRoutes);


