/*
 * @Date: 2024-04-12 11:51:30
 * @LastEditors: phil_litian
 */
import { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from '@/router/constant'
import { t } from '@h/web/useI18n'

const comp: AppRouteRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    title: t('routes.demo.comp.comp'),
    orderNo: 1000,
    icon: 'ion:layers-outline'
  },
  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('@/views/demo/comp/button/index.vue'),
      meta: {
        title: t('routes.demo.comp.basic')
      }
    },
    {
      path: 'cardList',
      name: 'CardListDemo',
      component: () => import('@/views/demo/comp/cardList/index.vue'),
      meta: {
        title: t('routes.demo.comp.cardList')
      }
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('@/views/demo/comp/drawer/index.vue'),
      meta: {
        title: t('routes.demo.comp.drawer')
      }
    },
    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('@/views/demo/comp/modal/index.vue'),
      meta: {
        title: t('routes.demo.comp.modal')
      }
    },
    {
      path: 'loading',
      name: 'LoadingDemo',
      component: () => import('@/views/demo/comp/loading/index.vue'),
      meta: {
        title: t('routes.demo.comp.loading')
      }
    },
    {
      path: 'scroll',
      name: 'ScrollDemo',
      meta: {
        title: t('routes.demo.comp.scroll')
      },
      children: [
        {
          path: 'basic',
          name: 'BasicScrollDemo',
          component: () => import('@/views/demo/comp/scroll/index.vue'),
          meta: {
            title: t('routes.demo.comp.scrollBasic')
          }
        },
        {
          path: 'action',
          name: 'ActionScrollDemo',
          component: () => import('@/views/demo/comp/scroll/action.vue'),
          meta: {
            title: t('routes.demo.comp.scrollAction')
          }
        },
        {
          path: 'virtual',
          name: 'VirtualScrollDemo',
          component: () => import('@/views/demo/comp/scroll/virtualScroll.vue'),
          meta: {
            title: t('routes.demo.comp.virtualScroll')
          }
        }
      ]
    }
  ]
}

export default comp