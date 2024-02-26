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

  // 配置路由
  setupRouter(app)

  // 引入语言配置 实现国际化
  setUpI18n(app)

  app.mount('#app')
}

bootstrap()

// todos: 2. 语言配置 3.路由配置

