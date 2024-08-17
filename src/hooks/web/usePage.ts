/*
 * @Date: 2024-02-22 14:54:18
 * @LastEditors: phil_litian
 */
import { type Router, useRouter } from 'vue-router'
import { REDIRECT_NAME } from '@/router/constant'
import { PageEnum } from '@/enums/pageEnum';

export enum GoType {
  'replace',
  'after'
}

export const useGo = (_router?: Router) => {
  const { push, replace } = _router || useRouter()
  function go (opt?: any): void;
  function go(opt: any, isReplace: boolean): void;
  function go(opt: any, goType: GoType): void;
  function go(opt: any = PageEnum.BASIC_HOME, isReplaceOrGoType: boolean | GoType = false) {
    // push(opt)
    replace(opt)
  }

  return { go }
}

// 刷新
export const useRedo = (_router?: Router) => {
  
  const { replace, currentRoute } = _router || useRouter()
  const { name, query, params, fullPath } = currentRoute.value
  console.log('name', name);
  
  function redo() {
    return new Promise((resolve, reject) => {
      params['_redirect_type'] = 'path';
      params.path = fullPath
      
      replace({ name: REDIRECT_NAME, params }).then(() => resolve(true))
    })
  }
  
  return redo
}
