/*
 * @Date: 2024-02-21 21:18:46
 * @LastEditors: phil_litian
 * 数据持久化处理
 */
import type { Pinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'


// 数据持久化插件
export const registerPiniaPersistPlugin = (pinia: Pinia) => {
  pinia.use(createPersistedState())
}

// 持久化配置参数(可灵活配置选项)
const createPersistedStateOptions = () => {
  return {
    
  }
}

