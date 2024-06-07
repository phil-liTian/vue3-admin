/*
 * @Date: 2024-05-30 21:42:53
 * @LastEditors: phil_litian
 */

import { TooltipProps } from "ant-design-vue";

export interface ActionItem {
  label?: string,
  icon?: string,
  text?: string;
  tooltip?: string | TooltipProps;
  popConfirm?: PopConfirm;
  onClick?: Fn
}


export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string,
  confirm: Fn
}
