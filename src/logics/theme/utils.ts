/*
 * @Date: 2024-03-26 20:37:02
 * @LastEditors: phil_litian
 */

const docEle = document.documentElement

// 设置全局样式
export const setCssVar = (prop: string, val: string, dom = docEle) => {
  dom.style.setProperty(prop, val)
}
