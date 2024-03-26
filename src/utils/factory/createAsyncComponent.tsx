/*
 * @Date: 2024-03-26 11:44:12
 * @LastEditors: phil_litian
 * 创建一个异步加载组件
 */

import { AsyncComponentLoader, Component, defineAsyncComponent } from 'vue'
import { Spin } from 'ant-design-vue'
import { noop } from '@u/index'

interface Options {
  loading?: boolean,
  size?: 'small' | 'default' | 'large',
  timeout?: number,
  delay?: number,
  retry?: boolean
}

// 定义一个异步组件，它在运行时是懒加载的.参数可以是一个异步加载函数，或是对加载行为进行更具体定制的一个选项对象。
export function createAsyncComponent<T extends Component>(loader: AsyncComponentLoader<T>, options: Options = {}) {
  const { loading = false, size = 'small', timeout = 30000, delay = 300, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin size={size} spinning={true}></Spin> : undefined,
    timeout,
    delay,
    onError: !retry ? noop : (error, retry, fail, attempts) => {
      if ( error.message.match(/fetch/) && attempts < 3 ) {
        retry()
      } else {
        fail()
      }
    }
  })
}
