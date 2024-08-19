/*
 * @Date: 2024-03-22 23:06:16
 * @LastEditors: phil_litian
 */

import { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT, getParentLayout } from '@/router/constant'
import { t } from "@/hooks/web/useI18n";
import { RoleEnum } from "@/enums/roleEnum";

const permission: AppRouteRecordRaw = {
  path: '/permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    title: t('routes.demo.permissions.title'),
    orderNo: 2,
    icon: 'ion:key-outline'
  },
  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      meta: {
        title: t('routes.demo.permissions.front'),
      },

      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('@/views/demo/permission/front/index.vue'),
          meta: {
            title: t('routes.demo.permissions.frontPage')
          }
        },
        {
          path: 'btn',
          name: 'FrontBtnAuth',
          component: () => import('@/views/demo/permission/front/Btn.vue'),
          meta: {
            title: t('routes.demo.permissions.frontBtn')
          }
        },
        {
          path: 'frontTestA',
          name: 'FrontTestADemo',
          component: () => import('@/views/demo/permission/front/authPageA.vue'),
          meta: {
            title: t('routes.demo.permissions.frontTestA'),
            roles: [ RoleEnum.SUPER ]
          }
        },
        {
          path: 'frontTestB',
          name: 'FrontTestBDemo',
          component: () => import('@/views/demo/permission/front/authPageB.vue'),
          meta: {
            title: t('routes.demo.permissions.frontTestB'),
            roles: [RoleEnum.TEST]
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
          name: 'BackPageAuth',
          component: () => import('@/views/demo/permission/back/index.vue'),
          meta: {
            title: t('routes.demo.permissions.backPage')
          }
        }
      ]
    }
  ]
}

export default permission
