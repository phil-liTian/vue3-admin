/*
 * @Date: 2024-03-26 14:59:57
 * @LastEditors: phil_litian
 */
import type { Emitter } from '@u/mitt'
import { createContext, useContext } from '@h/core/useContext'
import { InjectionKey, Ref } from 'vue'

export type MenuEmitterEvent = {
  'on-menu-item-select': string | number,
  'open-name-change': {
    name: string | number,
    opened: boolean
  },
  'on-update-opened': (string | number)[]
}

interface SimpleRootMenuContextProps {
  rootMenuEmitter: Emitter<MenuEmitterEvent>,
  activeName: Ref<string | number>
} 

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol()

export const createSimpleRootMenuContext = (context: SimpleRootMenuContextProps) => {
  return createContext<SimpleRootMenuContextProps>(context, key, { native: true })
}

export const useSimpleRootMenuContext = () => {
  return useContext<SimpleRootMenuContextProps>(key)
}