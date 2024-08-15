import { App, ComponentPublicInstance } from 'vue'
import { useErrorLogStoreWithOut } from '@s/modules/errorLog'
import { ErrorTypeEnum } from '@e/exceptionEnum'


function formatComponentName(vm) {
  if ( vm.$root === vm ) {
    return {
      name: 'root',
      path: 'root'
    }
  }

  const options = vm.$options
  if ( !options ) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    }
  }

  return {
    name: options._componentTag || options.name,
    file: options.__file
  }
}

function vueErrorHandler(err: unknown, instance: Nullable<ComponentPublicInstance>, info: string) {
  const errorLogStore = useErrorLogStoreWithOut()
  // console.log('err, instance, info', err, instance, info);
  const { name, path } = formatComponentName(instance)
  errorLogStore.addErrorLogInfo({
    name,
    url: window.location.href,
    type: ErrorTypeEnum.VUE,
    file: path,
    detail: info,
    message: (err as Error).message
  })
}

// 监控和处理页面中的意外错误，提升应用的稳定性和用户体验。但需要注意的是，它无法捕获资源加载错误（如 404 错误的图片）
function scriptErrorHandler(message, source, lineno, colno, error) {
  const errorLogStore = useErrorLogStoreWithOut()
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.SCRIPT,
    url: window.location.href,
    detail: '',
    file: '',
    message: ''
  })
}

// 当一个 Promise 被拒绝（即 reject 被调用），并且没有使用 .catch() 方法或其他方式来处理这个拒绝时，就会触发 unhandledrejection 事件
function registerPromiseErrorHandler() {
  window.addEventListener('unhandledrejection', event => {
    console.log('event', event);
    const errorLogStore = useErrorLogStoreWithOut()
    errorLogStore.addErrorLogInfo({
      name: 'Promise Error',
      url: window.location.href,
      file: 'file',
      message: event.reason,
      type: ErrorTypeEnum.PROMISE
    })
  })
}


// 资源加载错误
function registerResourceErrorHandler() {
  window.addEventListener('error', event => {
    console.log('event', event);
    
    const errorLogStore = useErrorLogStoreWithOut()
    errorLogStore.addErrorLogInfo({
      name: 'Resource Error!',
      type: ErrorTypeEnum.RESOURCE,
      url: window.location.href,
      stack: 'resource is not found',
      detail: '',
      message: '',
      file: ''
    })
  })
}

export function setupErrorHandle(app: App) {

  // 监听vue的错误
  app.config.errorHandler = vueErrorHandler;

  // 脚本执行错误
  window.onerror = scriptErrorHandler

  // promise执行错误
  registerPromiseErrorHandler()

  // 资源加载错误
  registerResourceErrorHandler()
}
