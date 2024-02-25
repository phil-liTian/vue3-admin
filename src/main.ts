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

const bootstrap = () => {
  const app = createApp(App)
  // 配置store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
