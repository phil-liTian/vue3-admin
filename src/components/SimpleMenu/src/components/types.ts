/*
 * @Date: 2024-04-11 10:21:37
 * @LastEditors: phil_litian
 */

import { Ref } from "vue";

export interface MenuProps {
  theme: string;
  indentSize: number;
  collapse: boolean;
  activeName: string | number | undefined;
  openNames: string[]
}


export interface SubMenuProvider {
  addSubMenu?: () => void;
  removeSubMenu?: () => void;
  removeAll?: () => void;
  sliceIndex?: () => void;
  getOpenNames?: () => [];
  handleMouseLeave?: Fn;
  isRemoveAllPop?: Ref<boolean>;
  props: MenuProps;
  level?: number
}

