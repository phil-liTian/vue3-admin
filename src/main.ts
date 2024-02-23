/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { createApp } from 'vue'
import App from './App.vue'
// import '@/design/index.less'
import './design/index.less'
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
