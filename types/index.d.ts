/*
 * @Date: 2024-03-22 10:07:03
 * @LastEditors: phil_litian
 */

declare interface Fn<T = any, R = T> {
  ( ...args: T[] ): R
}


declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>