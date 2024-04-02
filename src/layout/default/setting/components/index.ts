/*
 * @Date: 2024-03-28 19:15:22
 * @LastEditors: phil_litian
 */
import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";

export const TypePicker = createAsyncComponent(() => import('./TypePicker.vue'))
export const ThemeColorPicker = createAsyncComponent(() => import('./ThemeColorPicker.vue'))
export const SettingFooter = createAsyncComponent(() => import('./SettingFooter.vue'))
export const SwitchItem = createAsyncComponent(() => import('./SwitchItem.vue'))
export const SelectItem = createAsyncComponent(() => import('./SelectItem.vue'))