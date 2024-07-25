import { LAYOUT } from "@/router/constant";
import { AppRouteModule } from "@/router/types";

const permission: AppRouteModule = {
  path: '/form-designer',
  name: 'FormDesign',
  component: LAYOUT,
  meta: {
    title: '表单设计',
    icon: 'el-icon-s-tools',
    orderNo: 2
  },
  children: [
    {
      path: 'design',
      name: 'Design',
      component: () => import('@/views/form-design/index.vue'),
      meta: {
        title: '表单设计'
      }
    }
  ]
}

export default permission
