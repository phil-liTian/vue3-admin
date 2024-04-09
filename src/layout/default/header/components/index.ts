/*
 * @Date: 2024-03-26 22:25:40
 * @LastEditors: phil_litian
 */
import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";

export const LayoutBreadCrumb = createAsyncComponent(() => import('./BreadCrumb.vue'))
export const UserDropdown = createAsyncComponent(() => import('./user-dropdown/index.vue'))


