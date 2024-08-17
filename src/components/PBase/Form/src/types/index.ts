/*
 * @Date: 2024-06-11 13:45:46
 * @LastEditors: phil_litian
 */

import { ExtractPropTypes } from "vue";

interface _CustomComponents {
  Upload: ExtractPropTypes<(typeof import('@c/PBase/Upload/src/BasicUpload.vue'))['default']>;
  RadioButtonGroup: ExtractPropTypes<typeof import('../components/RadioButtonGroup.vue')['default']>;
  BasicTitle: ExtractPropTypes<typeof import('@c/Basic/src/BasicTitle.vue')['default']>;
  InputCountDown: ExtractPropTypes<(typeof import('@c/PBase/CountDown/src/BasicCountDown.vue'))['default']>;
  ApiSelect: ExtractPropTypes<(typeof import('../components/ApiSelect.vue'))['default']>;
  ApiCascader: ExtractPropTypes<(typeof import('../components/ApiCascader.vue'))['default']>;
  ApiRadioGroup: ExtractPropTypes<(typeof import('../components/RadioGroup.vue'))['default']>;
  ApiTransfer: ExtractPropTypes<(typeof import('../components/Transfer.vue'))['default']>;
  ApiTreeSelect: ExtractPropTypes<(typeof import('../components/TreeSelect.vue'))['default']>;
  ApiTree: ExtractPropTypes<(typeof import('../components/Tree.vue'))['default']>;
}


type CustomComponents<T = _CustomComponents> = {
  [K in keyof T]: T[K]
}


export interface ComponentProps {
  Input: ExtractPropTypes<(typeof import('ant-design-vue/es/input'))['default']>;
  InputNumber: ExtractPropTypes<(typeof import('ant-design-vue/es/input-number'))['default']>;
  Select: ExtractPropTypes<(typeof import('ant-design-vue/es/select'))['default']>;
  Divider: ExtractPropTypes<(typeof import('ant-design-vue/es/divider'))['default']>;
  DatePicker: ExtractPropTypes<typeof import('ant-design-vue/es/date-picker')['default']>;
  MonthPicker: ExtractPropTypes<typeof import('ant-design-vue/es/date-picker')['MonthPicker']>;
  RangePicker: ExtractPropTypes<typeof import('ant-design-vue/es/date-picker')['RangePicker']>;
  WeekPicker: ExtractPropTypes<typeof import('ant-design-vue/es/date-picker')['WeekPicker']>;
  TimePicker: ExtractPropTypes<typeof import('ant-design-vue/es/time-picker')['TimePicker']>;
  TimeRangePicker: ExtractPropTypes<typeof import('ant-design-vue/es/time-picker')['TimeRangePicker']>;
  CheckboxGroup: ExtractPropTypes<typeof import('ant-design-vue/es/checkbox')['CheckboxGroup']>;
  Checkbox: ExtractPropTypes<typeof import('ant-design-vue/es/checkbox')['default']>;
  RadioGroup: ExtractPropTypes<typeof import('ant-design-vue/es/radio')['RadioGroup']>;
  Cascader: ExtractPropTypes<typeof import('ant-design-vue/es/cascader')['default']>;
  Switch: ExtractPropTypes<typeof import('ant-design-vue/es/switch')['default']>;
  Slider: ExtractPropTypes<typeof import('ant-design-vue/es/slider')['default']>;
  Upload: CustomComponents['Upload'],
  RadioButtonGroup: CustomComponents['RadioButtonGroup'],
  BasicTitle: CustomComponents['BasicTitle'],
  InputCountDown: CustomComponents['InputCountDown'],
  ApiSelect: CustomComponents['ApiSelect'],
  ApiCascader: CustomComponents['ApiCascader'],
  ApiRadioGroup: CustomComponents['ApiRadioGroup'],
  ApiTransfer: CustomComponents['ApiTransfer'],
  ApiTreeSelect: CustomComponents['ApiTreeSelect'],
  ApiTree: CustomComponents['ApiTree'],
}

export type ComponentType = keyof ComponentProps


export interface ColEx {
  style: any;

  // 
  span?: number;
}
