/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { createPinia } from 'pinia';
import { registerPiniaPersistPlugin } from './plugin/persist';

const store = createPinia();
// 持久化处理
registerPiniaPersistPlugin(store);

// 由于有了底层 API 的支持，Pinia store 现在完全支持扩展. 使用store.use可添加插件到pinia中
export const setupStore = (app) => {
	app.use(store);
};

export { store };
