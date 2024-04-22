/*
 * @Date: 2024-04-18 19:32:35
 * @LastEditors: phil_litian
 */

import { Bar_Map } from "./typing";


export const BAR_MAP: Bar_Map = {
  vertical: {
    key: 'vertical',
    axis: 'Y',
    size: 'height'
  },

  horizontal: {
    key: 'horizontal',
    axis: 'X',
    size: 'width'
  }
}

export function renderThumbStyle({ move, size, bar }) {
  const style =  {} as any
  
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate


  return style
}