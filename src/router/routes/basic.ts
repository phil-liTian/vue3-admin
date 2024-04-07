/*
 * @Date: 2024-02-26 19:24:15
 * @LastEditors: phil_litian
 */
import { LAYOUT, PAGE_NOT_FOUND_NAME, REDIRECT, REDIRECT_NAME } from "../constant";
import { AppRouteRecordRaw } from "../types";

// 404页面
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  // :path：这是一个动态路由参数，表示路径中的一部分是可变的
  // (.*)：这是一个通配符匹配，表示匹配任意字符（包括零个或多个字符）
  // *：表示前面的通配符可以匹配零次或多次。
  path: '/:path(.*)*', // 标识匹配任意路径 会造成一定的性能开销, 只有在需要处理通用或未定义的路径时 才增加当前配置
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideMenu: true
  }
}

// 重定向的页面
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  meta: {
    title: REDIRECT_NAME
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)?/:_origin_params(.*)?',
      name: REDIRECT_NAME,
      component: REDIRECT,
      meta: {
        title: REDIRECT_NAME
      },
    }
  ]
}
