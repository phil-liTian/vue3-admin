import { ExceptionEnum } from "@/enums/exceptionEnum";
import { t } from "@/hooks/web/useI18n";
import { LAYOUT, getParentLayout } from "@/router/constant";
import { AppRouteModule } from "@/router/types";

const ExceptionPage = () => import('@/views/sys/exception/Exception.vue');

const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/exception',
  meta: {
    orderNo: 20,
    icon: 'ion:layers-outline',
    title: t('routes.demo.page.page')
  },
  children: [
    {
      path: 'form',
      name: 'FormPage',
      // component: getParentLayout(''),
      meta: {
        title: t('routes.demo.page.form'),
        icon: 'ion:document-text-outline'
      },
      children: [
        {
          path: 'basic',
          component: () => import('@/views/demo/page/form/basic/index.vue'),
          meta: {
            title: t('routes.demo.page.formBasic')
          }
        }
      ]
    },
    // // account
    // {
    //   path: 'account',
    //   redirect: '/account/center',
    //   // component: () => import('@/views/demo/page/account/center/index.vue'),
    //   meta: {
    //     title: t('routes.demo.page.account'),
    //     icon: 'ion:settings-outline'
    //   },
    //   children: [
    //     {
    //       path: 'center',
    //       component: () => import('@/views/demo/page/account/center/index.vue'),
    //       meta: {
    //         title: t('routes.demo.page.accountCenter')
    //       }
    //     }
    //   ]
    // },

    // exception
    {
      path: 'exception',
      name: 'Exception',
      // component: ExceptionPage,
      redirect: '/exception/404',
      // component: getParentLayout('ExceptionPage'),
      meta: {
        title: t('routes.demo.page.exception'),
        icon: 'ion:settings-outline'
      },
      children: [
        {
          path: '404',
          // name: 'PageNotFound',
          component: ExceptionPage,
          // 当前传递的props 在组件内可以直接接收到
          props: {
            status: ExceptionEnum.PAGE_NOT_FOUND
          },
          meta: {
            title: '404'
          }
        },
        {
          path: '403',
          // name: 'PageNotFound',
          component: ExceptionPage,
          // 当前传递的props 在组件内可以直接接收到
          props: {
            status: ExceptionEnum.PAGE_NOT_ACCESS
          },
          meta: {
            title: '403'
          }
        },
        {
          path: '500',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.PAGE_ERROR
          },
          meta: {
            title: '500'
          }
        },
        {
          path: 'network-error',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.NET_WORK_ERROR
          },
          meta: {
            title: t('routes.demo.page.networkError')
          }
        },
        {
          path: 'no-data',
          component: ExceptionPage,
          props: {
            status: ExceptionEnum.PAGE_NOT_RESPONSE
          },
          meta: {
            title: t('routes.demo.page.notData')
          }
        }
      ]
    }
  ]
}


export default page