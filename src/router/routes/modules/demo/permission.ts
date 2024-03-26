/*
 * @Date: 2024-03-22 23:06:16
 * @LastEditors: phil_litian
 */

import { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT, getParentLayout } from '@/router/constant'
import { t } from "@/hooks/web/useI18n";

const steps: AppRouteRecordRaw = {
  path: '/permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    title: t('routes.demo.permissions.title'),
    orderNo: 999,
    icon: 'ion:key-outline'
  },
  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      // component: getParentLayout('PermissionFrontDemo'),
      meta: {
        title: t('routes.demo.permissions.front'),
      },

      children: [
        {
          path: 'page',
          component: () => import('@/views/demo/permission/front/index.vue'),
          meta: {
            title: t('routes.demo.permissions.frontPage')
          }
        }
      ]
    },

    {
      path: 'back',
      name: 'PermissionBackDemo',
      // component: getParentLayout('PermissionBackDemo'),
      meta: {
        title: t('routes.demo.permissions.back'),
      },

      children: [
        { 
          path: 'page',
          component: () => import('@/views/demo/permission/back/index.vue'),
          meta: {
            title: t('routes.demo.permissions.backPage')
          }
        }
      ]
    }
  ]
}

export default steps