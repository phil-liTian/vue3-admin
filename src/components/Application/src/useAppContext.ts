/*
 * @Date: 2024-02-22 11:55:18
 * @LastEditors: phil_litian
 */
import { InjectionKey, Ref } from 'vue'
import { useContext, createContext } from "@/hooks/core/useContext";

interface AppProviderContextProps {
  prefixCls: Ref<string>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export const createAppProviderContext = (context: AppProviderContextProps) => {
  return createContext<AppProviderContextProps>(context, key)
}

export const useAppProviderContext = () => {
  return useContext<AppProviderContextProps>(key)
}
