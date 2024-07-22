/*
 * @Date: 2024-07-19 15:29:16
 * @LastEditors: phil_litian
 */

/**
 * 限制timespan时间内fn函数仅可执行一次
 * @param fn 
 * @param timespan 
 * @returns 
 */
export function limit(fn: any, timespan: number) {
  let pendding = false;

  return (...args: any[]) => {
    if (pendding) return;
    pendding = true;
    fn(...args);
    setTimeout(() => {
      pendding = false
    }, timespan);
  }
}

