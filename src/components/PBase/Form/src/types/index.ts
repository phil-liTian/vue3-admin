/*
 * @Date: 2024-06-11 13:45:46
 * @LastEditors: phil_litian
 */

import { ExtractPropTypes } from "vue";

interface _CustomComponents {
  Upload: ExtractPropTypes<(typeof import('@c/PBase/Upload/src/BasicUpload.vue'))['default']>
}


type CustomComponents<T = _CustomComponents> = {
  [K in keyof T]: T[K]
}


export interface ComponentProps {
  Input: ExtractPropTypes<(typeof import('ant-design-vue/es/input'))['default']>;
  Select: ExtractPropTypes<(typeof import('ant-design-vue/es/select'))['default']>;
  Divider: ExtractPropTypes<(typeof import('ant-design-vue/es/divider'))['default']>;
  Upload: CustomComponents['Upload']
}

export type ComponentType = keyof ComponentProps


export interface ColEx {
  style: any;

  // 
  span?: number;
}
