/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import 'uno.css'
import 'virtual:svg-icons-register'
import '@/design/index.less'
// 利用ant-design-vue基础样式设置
import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { registerGlobComps } from '@c/registerGlobComponents'
import { initAppConfig } from './logics/initAppConfig'
import { setUpI18n } from '@/locales/index'

const bootstrap = async () => {
  const app = createApp(App)
  // 配置store
  setupStore(app)

  // 初始化全局性的配置
  initAppConfig()

  // 配置全局组件
  registerGlobComps(app)

  // 引入语言配置 实现国际化 await是很有必要的, 否则可能导致app.vue文件中useLocale()报错
  // 因为setUpI18n存在异步import语言配置相关文件
  await setUpI18n(app)

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
