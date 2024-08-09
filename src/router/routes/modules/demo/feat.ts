/*
 * @Date: 2024-07-23 09:45:00
 * @LastEditors: phil
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
      path: 'msg',
      name: 'MsgDemo',
      component: () => import('@/views/demo/feat/msg/index.vue'),
      meta: {
        title: t('routes.demo.feat.msg')
      }
    },
    {
      path: "ripple",
      name: 'RippleDemo',
      component: () => import('@/views/demo/feat/ripple/index.vue'),
      meta: {
        title: t('routes.demo.feat.ripple')
      }
    },
    {
      path: "watermark",
      name: "watermarkDemo",
      component: () => import('@/views/demo/feat/watermark/index.vue'),
      meta: {
        title: t('routes.demo.feat.watermark')
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
    {
      path: 'img-preview',
      name: 'ImgPreviewDemo',
      component: () => import('@/views/demo/feat/img-preview/index.vue'),
      meta: {
        title: t('routes.demo.feat.imgPreview')
      }
    },
    {
      path: "excel",
      name: "Excel",
      redirect: "",
      meta: {
        title: t('routes.demo.excel.excel')
      },
      children: [
        {
          path: 'importExcel',
          name: 'ImportExcelDemo',
          component: () => import('@/views/demo/excel/ImportExcel.vue'),
          meta: {
            title: t('routes.demo.excel.importExcel')
          }
        }
      ]
    },
    {
      path: 'error-log',
      name: 'ErrorLog',
      component: () => import('@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.demo.feat.errorLog')
      }
    }
  ]
}


export default feat