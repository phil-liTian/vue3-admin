/*
 * @Date: 2024-07-23 09:45:00
 * @LastEditors: phil_litian
 */
import { t } from "@/hooks/web/useI18n";
import { LAYOUT } from "@/router/constant";
import { AppRouteModule } from "@/router/types";

const feat: AppRouteModule = {
  path: "/feat",
  name: "FeatDemo",
  component: LAYOUT,
  meta: {
    orderNo: 19,
    icon: "icon-park-outline:feature",
    title: t('routes.demo.feat.feat')
  },
  children: [
    {
      path: 'copy',
      name: 'CopyDemo',
      component: () => import('@/views/demo/feat/copy/index.vue'),
      meta: {
        title: t('routes.demo.feat.copy')
      }
    },
    {
      path: "click-out-side",
      name: 'ClickOutSideDemo',
      component: () => import('@/views/demo/feat/click-out-side/index.vue'),
      meta: {
        title: t('routes.demo.feat.clickOutSide')
      }
    },
    {
      path: "context-menu",
      name: "ContextMenuDemo",
      component: () => import('@/views/demo/feat/context-menu/index.vue'),
      meta: {
        title: t('routes.demo.feat.contextMenu')
      }
    },
    {
      path: 'full-screen',
      name: 'FullScreenDemo',
      component: () => import('@/views/demo/feat/full-screen/index.vue'),
      meta: {
        title: t('routes.demo.feat.fullScreen')
      }
    },
    {
      path: 'print',
      name: 'PrintDemo',
      component: () => import('@/views/demo/feat/print/index.vue'),
      meta: {
        title: t('routes.demo.feat.print')
      }
    },
    {
      path: 'ws',
      name: 'WebSocketDemo',
      component: () => import('@/views/demo/feat/ws/index.vue'),
      meta: {
        title: t('routes.demo.feat.ws')
      },
    },
  ]
}


export default feat