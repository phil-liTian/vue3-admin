/*
 * @Date: 2024-07-23 13:36:11
 * @LastEditors: phil_litian
 */

export interface Axis {
  x?: number;
  y?: number
}

export interface ContextMenuItem {
  label: string;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
  divider?: boolean;
  handler?: Fn;
  children?: ContextMenuItem[];
}


export interface CreateContextOptions {
  event: MouseEvent;
  icon?: string;
  style?: any;
  items?: ContextMenuItem[]
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  axis: Axis;
}
