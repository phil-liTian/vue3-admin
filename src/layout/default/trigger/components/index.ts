/*
 * @Date: 2024-04-02 16:51:45
 * @LastEditors: phil_litian
 */
import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";

export const HeaderTrigger = createAsyncComponent(() => import('./HeaderTrigger.vue'))
export const SideTrigger = createAsyncComponent(() => import('./SideTrigger.vue'))
