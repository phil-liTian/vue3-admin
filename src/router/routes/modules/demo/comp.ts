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
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/basic',
      meta: {
        title: t('routes.demo.table.table')
      },
      children: [
        {
          path: "basic",
          name: 'BasicTableDemo',
          component: () => import('@/views/demo/table/Basic.vue'),
          meta: {
            title: t('routes.demo.table.basic')
          }
        },
        {
          path: 'treeTable',
          name: 'TreeTableDemo',
          component: () => import('@/views/demo/table/TreeTable.vue'),
          meta: {
            title: t('routes.demo.table.treeTable')
          }
        },
        {
          path: "footerTable",
          name: 'FooterTableDemo',
          component: () => import('@/views/demo/table/FooterTable.vue'),
          meta: {
            title: t('routes.demo.table.footerTable')
          }
        },
      ]
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
    },
    {
      path: 'qrcode',
      name: 'qrcodeDemo',
      component: () => import('@/views/demo/comp/qrcode/index.vue'),
      meta: {
        title: t('routes.demo.comp.qrcode')
      }
    },
    {
      path: 'transition',
      name: 'transitionDemo',
      component: () => import('@/views/demo/comp/transition/index.vue'),
      meta: {
        title: t('routes.demo.comp.transition')
      }
    },
    {
      path: 'time',
      name: 'timeDemo',
      component: () => import('@/views/demo/comp/time/index.vue'),
      meta: {
        title: t('routes.demo.comp.time')
      }
    },
    {
      path: 'countTo',
      name: 'countToDemo',
      component: () => import('@/views/demo/comp/countTo/index.vue'),
      meta: {
        title: t('routes.demo.comp.countTo')
      }
    },
    {
      path: 'description',
      name: 'descriptionDemo',
      component: () => import('@/views/demo/comp/description/index.vue'),
      meta: {
        title: t('routes.demo.comp.desc')
      }
    },
    {
      path: 'verify',
      name: 'verifyDemo',
      redirect: '/comp/verify/drag',
      meta: {
        title: t('routes.demo.comp.verify')
      },

      children: [
        {
          path: "drag",
          name: "verifyDragDemo",
          component: () => import('@/views/demo/comp/verify/index.vue'),
          meta: {
            title: t('routes.demo.comp.verifyDrag')
          }
        },
        {
          path: "dragRotate",
          name: "verifyRotateDemo",
          component: () => import('@/views/demo/comp/verify/rotate.vue'),
          meta: {
            title: t('routes.demo.comp.verifyRotateDrag')
          }
        }
      ]
    },
  ]
}

export default comp