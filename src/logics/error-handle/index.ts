import { App, ComponentPublicInstance } from 'vue'
import { useErrorLogStoreWithOut } from '@s/modules/errorLog'

function vueErrorHandler(err: unknown, instance: Nullable<ComponentPublicInstance>, info: string) {

}

// 监控和处理页面中的意外错误，提升应用的稳定性和用户体验。但需要注意的是，它无法捕获资源加载错误（如 404 错误的图片）
function scriptErrorHandler(message, source, lineno, colno, error) {

}

export function setupErrorHandle(app: App) {

  // 监听vue的错误
  app.config.errorHandler = vueErrorHandler;

  // 脚本执行错误
  window.onerror = scriptErrorHandler

  // promise执行错误

  // 资源加载错误
}