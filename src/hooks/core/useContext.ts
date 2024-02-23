/*
 * @Date: 2024-02-22 19:22:34
 * @LastEditors: phil_litian
 */

import { inject, InjectionKey, readonly as defineReadonly, provide, reactive } from "vue";

interface CreateContextOptions {
  readonly?: boolean
}

export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
  const state = reactive(context)
  const { readonly = true } = options
  
  const provideData = readonly ? defineReadonly(state) : state;
  provide(key, provideData)

  return {
    state
  }
}

export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any) {
  return inject(key, defaultValue || {})
}
