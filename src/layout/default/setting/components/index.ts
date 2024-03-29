/*
 * @Date: 2024-03-28 19:15:22
 * @LastEditors: phil_litian
 */
import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";

export const ThemeColorPicker = createAsyncComponent(() => import('./ThemeColorPicker.vue'))
