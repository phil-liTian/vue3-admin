/*
 * @Date: 2024-03-02 22:02:34
 * @LastEditors: phil_litian
 */
import { LAYOUT } from '@/router/constant'
import { AppRouteRecordRaw } from '@/router/types'
import { useI18n } from '@h/web/useI18n'

const { t } = useI18n()

const dashBoard: AppRouteRecordRaw = {
  name: 'DashBoard',
  path: '/dashBoard',
  component: LAYOUT,
  redirect: '/dashBoard/workbench',
  meta: {
    title: t('routes.dashBoard.dashBoard')
  },
  children: [
    {
      name: 'Analysis',
      path: 'analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: t('routes.dashBoard.analysis')
      }
    },

    {
      name: 'Workbench',
      path: 'workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashBoard.workbench')
      }
    }
  ]
}

export default dashBoard