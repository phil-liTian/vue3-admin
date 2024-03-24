/*
 * @Date: 2024-03-23 10:34:38
 * @LastEditors: phil_litian
 */
export type Key = string | undefined

export interface MenuState {

  // 默认选中的列表
  defaultSelectKeys: Key[],

  // 展开数组
  openKeys: Key[],

  // 选中的内容
  selectKeys: Key[]
}