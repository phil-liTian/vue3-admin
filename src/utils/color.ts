/*
 * @Date: 2024-03-26 20:42:57
 * @LastEditors: phil_litian
 */

// 颜色变浅处理
export function lighten(color: string, amount: number): string {
  color = color.replace('#', '')
  amount = Math.trunc((255 * amount) / 100)

  return `#${addLight(color.slice(0, 2), amount)}${addLight(color.slice(2, 4), amount)}${addLight(color.slice(4, 6), amount)}`
}

// 颜色变深处理 降低亮度
export function darken(color: string, amount: number): string {
  color = color.replace('#', '')
  amount = Math.trunc((255 * amount) / 100)

  return `#${subtractLight(color.slice(0, 2), amount)}${subtractLight(color.slice(2, 4), amount)}${subtractLight(color.slice(4, 6), amount)}`
}

// 增加亮度 颜色变浅
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount;
  const c = Math.min(255, cc)
  
  return `0${c.toString(16)}`.slice(-2)
}

// 降低亮度 颜色变深
function subtractLight(color: string, amount: number) {
  const cc = parseInt(color, 16) - amount;
  const c = Math.max(0, cc)
  
  return `0${c.toString(16)}`.slice(-2)
}
