/*
 * @Date: 2024-02-26 19:24:51
 * @LastEditors: phil_litian
 */
import { AppRouteRecordRaw } from "../types";

export const mainOut: AppRouteRecordRaw = {
  path: '/main-out',
  name: 'MainOut',
  component: () => import('@v/demo/main-out/index.vue'),
  meta: {
    title: 'MainOut'
  }
}

