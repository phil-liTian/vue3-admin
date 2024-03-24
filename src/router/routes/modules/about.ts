/*
 * @Date: 2024-03-20 21:16:16
 * @LastEditors: phil_litian
 */
import { LAYOUT } from '@/router/constant'
import { AppRouteRecordRaw } from '@/router/types'
import { useI18n } from '@h/web/useI18n'

const { t } = useI18n()

const about: AppRouteRecordRaw = {
  name: 'About',
  path: '/about',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    title: t('routes.dashBoard.about'),
    orderNo: 1000,
    hideChildrenInMenu: true // 隐藏children
  },
  children: [
    {
      name: 'AboutPage',
      path: 'index',
      component: () => import('@/views/sys/about/index.vue'),
      meta: {
        title: t('routes.dashBoard.about'),
        hideMenu: true
      }
    }
  ]
}

export default about