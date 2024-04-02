/*
 * @Date: 2024-03-31 10:51:00
 * @LastEditors: phil_litian
 */
import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";

export const TabRedo = createAsyncComponent(() => import('./TabRedo.vue'))
export const SettingButton = createAsyncComponent(() => import('./SettingButton.vue'))
export const FoldButton = createAsyncComponent(() => import('./FoldButton.vue'))
export const TabContent = createAsyncComponent(() => import('./TabContent.vue'))
