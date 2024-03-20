/*
 * @Date: 2024-03-19 10:37:34
 * @LastEditors: phil_litian
 */
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';
import { createStorage as create, CreateStorageParams } from './storageCache';
import { getStorageShortName } from '@u/env'

const createOptions = (storage: Storage, options: Partial<CreateStorageParams> = {} ) => {
  return {
    prefixKey: getStorageShortName(),
    storage,
    ...options
  }
}

const createStorage = (storage: Storage = sessionStorage, options = {}) => {
  return create(createOptions(storage, options))
}

// localStorage
export const createLocalStorage = (options = {}) => {
  return createStorage(localStorage, { timeout: DEFAULT_CACHE_TIME, ...options })
}

// sessionStorage
export const createSessionStorage = (options = {}) => {
  return createStorage(sessionStorage, { timeout: DEFAULT_CACHE_TIME, ...options })
}

export const WebStorage = createOptions(sessionStorage)
