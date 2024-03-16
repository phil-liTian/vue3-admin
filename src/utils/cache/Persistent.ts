/*
 * @Date: 2024-03-16 10:31:48
 * @LastEditors: phil_litian
 */
import { Memory } from './Memory'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'

const localMemory = new Memory(DEFAULT_CACHE_TIME)

export class Persistent {
  static setLocal(key, value, immediate = false) {
    console.log('immediate', immediate);
    
    // localMemory.set(key, value)
    console.log('localStorage');
    
    immediate && localStorage.setItem(key, value)
  }

  static getLocal(key) {
    return localStorage.getItem(key)
  }

  static getSession(key) {

  }

  static setSession(key, value) {
    
  }
}
