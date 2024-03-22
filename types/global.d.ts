/*
 * @Date: 2024-02-26 15:41:04
 * @LastEditors: phil_litian
 */
export {}
declare global {

  type Recordable<T = any> = Record<string, T>
  
  type Nullable<T> = T | null
}