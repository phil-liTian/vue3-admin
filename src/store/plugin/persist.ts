/*
 * @Date: 2024-02-21 21:18:46
 * @LastEditors: phil_litian
 * 数据持久化处理
 */
import type { Pinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate'

// 自定义序列化器, 用于序列化和反序列化存储数据
const customerSerializer = () => {
  return {
    serialize: value => {
      return JSON.stringify(value)
    },
    deserialize: value => {
      return JSON.parse(value)
    }
  }
}

// 数据持久化插件
export const registerPiniaPersistPlugin = (pinia: Pinia) => {
  pinia.use(createPersistedState(createPersistedStateOptions()))
}

// 持久化配置参数(可灵活配置选项)
const createPersistedStateOptions = () : PersistedStateFactoryOptions => {
  return {
    key: id => id,
    storage: localStorage,
    serializer: customerSerializer()
  }
}

