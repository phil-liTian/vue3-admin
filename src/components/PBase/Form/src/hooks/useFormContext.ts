import { createContext, useContext } from '@h/core/useContext';
import { InjectionKey } from 'vue';

export interface FormContextProps {
  submitAction: () => Promise<void>;
  resetAction: () => Promise<void>;
}

const key: InjectionKey<FormContextProps> = Symbol()

export function createFormContext(context: FormContextProps) {
  createContext(context, key)
}

export function useFormContext() {
  return useContext(key)
}
