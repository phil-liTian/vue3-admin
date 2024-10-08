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
          path: 'fetchTable',
          name: 'FetchTableDemo',
          component: () => import('@/views/demo/table/FetchTable.vue'),
          meta: {
            title: t('routes.demo.table.fetchTable')
          }
        },
        {
          path: 'fixedColumn',
          name: 'FixedColumnDemo',
          component: () => import('@/views/demo/table/FixedColumnTable.vue'),
          meta: {
            title: t('routes.demo.table.fixedColumn')
          }
        },
        {
          path: 'customerCell',
          name: 'CustomerCellDemo',
          component: () => import('@/views/demo/table/CustomerCell.vue'),
          meta: {
            title: t('routes.demo.table.customerCell')
          }
        },
        // TODO 开启搜索区域
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('@/views/demo/table/UseTable.vue'),
          meta: {
            title: t('routes.demo.table.useTable')
          }
        },
        {
          path: 'refTable',
          name: 'RefTableDemo',
          component: () => import('@/views/demo/table/RefTable.vue'),
          meta: {
            title: t('routes.demo.table.refTable')
          }
        },
        {
          path: 'multipleHeader',
          name: 'MultipleHeaderDemo',
          component: () => import('@/views/demo/table/MultipleHeader.vue'),
          meta: {
            title: t('routes.demo.table.multipleHeader')
          }
        },
        {
          path: 'mergeHeader',
          name: 'MergeHeaderDemo',
          component: () => import('@/views/demo/table/MergeHeader.vue'),
          meta: {
            title: t('routes.demo.table.mergeHeader')
          }
        },
        {
          path: 'expandTable',
          name: 'expandTableDemo',
          component: () => import('@/views/demo/table/ExpandTable.vue'),
          meta: {
            title: t('routes.demo.table.expandTable')
          }
        },
        {
          path: "editCellTable",
          name: 'EditCellTableDemo',
          component: () => import('@/views/demo/table/EditCellTable.vue'),
          meta: {
            title: t('routes.demo.table.editCellTable')
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
        {
          path: 'vexTable',
          name: 'VexTableDemo',
          component: () => import('@/views/demo/table/VxeTable.vue'),
          meta: {
            title: t('routes.demo.table.vxeTable')
          }
        }
      ]
    },
    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic',
      meta: {
        title: t('routes.demo.form.form')
      },
      children: [
        {
          path: "basic",
          name: 'BasicFormDemo',
          component: () => import('@/views/demo/form/index.vue'),
          meta: {
            title: t('routes.demo.form.basic')
          }
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('@/views/demo/form/RefForm.vue'),
          meta: {
            title: t('routes.demo.form.refForm')
          }
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('@/views/demo/form/UseForm.vue'),
          meta: {
            title: t('routes.demo.form.useForm')
          }
        },
        {
          path: 'tabsForm',
          name: 'TabsFormDemo',
          component: () => import('@/views/demo/form/TabsForm.vue'),
          meta: {
            title: t('routes.demo.form.tabsForm')
          }
        },
        {
          path: 'advancedForm',
          name: 'AdvancedFormDemo',
          component: () => import('@/views/demo/form/AdvancedForm.vue'),
          meta: {
            title: t('routes.demo.form.advancedForm')
          }
        },
        {
          path: 'appendForm',
          name: 'appendFormDemo',
          component: () => import('@/views/demo/form/AppendForm.vue'),
          meta: {
            title: t('routes.demo.form.appendForm')
          }
        },
        {
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('@/views/demo/form/RuleForm.vue'),
          meta: {
            title: t('routes.demo.form.ruleForm')
          }
        },
        {
          path: 'dynamicForm',
          name: 'DynamicFormDemo',
          component: () => import('@/views/demo/form/DynamicForm.vue'),
          meta: {
            title: t('routes.demo.form.dynamicForm')
          }
        },
        {
          path: 'customerForm',
          name: 'CustomerFormDemo',
          component: () => import('@/views/demo/form/CustomerForm.vue'),
          meta: {
            title: t('routes.demo.form.customerForm')
          }
        }
      ]
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
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      meta: {
        title: t('routes.demo.comp.tree')
      },
      children: [
        {
          path: 'basic',
          name: 'TreeBasicDemo',
          component: () => import('@/views/demo/tree/index.vue'),
          meta: {
            title: t('routes.demo.comp.treeBasic')
          }
        }
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
      path: 'upload',
      name: 'uploadDemo',
      component: () => import('@/views/demo/comp/upload/index.vue'),
      meta: {
        title: t('routes.demo.comp.upload')
      }
    },
    {
      path: 'cropper',
      name: 'cropperDemo',
      component: () => import('@/views/demo/comp/cropper/index.vue'),
      meta: {
        title: t('routes.demo.comp.cropper')
      }
    },
    {
      path: 'strength-meter',
      name: 'StrengthMeterDemo',
      component: () => import('@/views/demo/comp/strength-meter/index.vue'),
      meta: {
        title: t('routes.demo.comp.strengthMeter')
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
  ]
}

export default comp