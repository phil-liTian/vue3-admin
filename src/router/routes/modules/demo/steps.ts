/*
 * @Date: 2024-03-22 23:06:16
 * @LastEditors: phil_litian
 */

import { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from '@/router/constant'
import { t } from "@/hooks/web/useI18n";

const steps: AppRouteRecordRaw = {
  path: '/steps',
  component: LAYOUT,
  redirect: '/steps/index',
  name: 'step',
  meta: {
    title: t('routes.demo.steps.title'),
    orderNo: 999,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll'
  },
  children: [
    {
      path: 'index',
      name: 'stepIndex',
      component: () => import('@/views/demo/steps/index.vue'),
      meta: {
        title: t('routes.demo.steps.title'),
        hideMenu: true
      }
    }
  ]
}

export default steps
