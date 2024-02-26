/*
 * @Date: 2024-02-26 19:35:55
 * @LastEditors: phil_litian
 */

export const REDIRECT_NAME = 'Redirect'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

// 404
export const LAYOUT = () => import('@/layout/default/index.vue')

// 重定向
export const REDIRECT = () => import('@v/sys/redirect/index.vue')

