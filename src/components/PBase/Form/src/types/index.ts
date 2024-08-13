/*
 * @Date: 2024-06-11 13:45:46
 * @LastEditors: phil_litian
 */

import { ExtractPropTypes } from "vue";

interface _CustomComponents {
  Upload: ExtractPropTypes<(typeof import('@c/PBase/Upload/src/BasicUpload.vue'))['default']>;
  RadioButtonGroup: ExtractPropTypes<typeof import('../components/RadioButtonGroup.vue')['default']>;
  BasicTitle: ExtractPropTypes<typeof import('@c/Basic/src/BasicTitle.vue')['default']>
}


type CustomComponents<T = _CustomComponents> = {
  [K in keyof T]: T[K]
}


export interface ComponentProps {
  Input: ExtractPropTypes<(typeof import('ant-design-vue/es/input'))['default']>;
  Select: ExtractPropTypes<(typeof import('ant-design-vue/es/select'))['default']>;
  Divider: ExtractPropTypes<(typeof import('ant-design-vue/es/divider'))['default']>;
  DatePicker: ExtractPropTypes<typeof import('ant-design-vue/es/date-picker')['default']>;
  CheckboxGroup: ExtractPropTypes<typeof import('ant-design-vue/es/checkbox')['CheckboxGroup']>;
  Checkbox: ExtractPropTypes<typeof import('ant-design-vue/es/checkbox')['default']>;
  RadioGroup: ExtractPropTypes<typeof import('ant-design-vue/es/radio')['RadioGroup']>;
  Cascader: ExtractPropTypes<typeof import('ant-design-vue/es/cascader')['default']>;
  Switch: ExtractPropTypes<typeof import('ant-design-vue/es/switch')['default']>;
  Upload: CustomComponents['Upload'],
  RadioButtonGroup: CustomComponents['RadioButtonGroup'],
  BasicTitle: CustomComponents['BasicTitle']
}

export type ComponentType = keyof ComponentProps


export interface ColEx {
  style: any;

  // 
  span?: number;
}
