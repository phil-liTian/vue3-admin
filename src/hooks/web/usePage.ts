/*
 * @Date: 2024-02-22 14:54:18
 * @LastEditors: phil_litian
 */
import { type Router, useRouter } from 'vue-router'

export enum GoType {
  'replace',
  'after'
}

export const useGo = (_router?: Router) => {
  const { push } = _router || useRouter()
  function go (opt: any): void;
  function go(opt: any, isReplace: boolean): void;
  function go(opt: any, goType: GoType): void;
  function go(opt: any, isReplaceOrGoType: boolean | GoType = false) {
    
    push(opt)
  }

  return { go }
}