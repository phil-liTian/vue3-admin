/*
 * @Date: 2024-03-06 17:10:03
 * @LastEditors: phil_litian
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createPlugins } from '../plugins'


export const defineApplicationConfig = () => {
  // 用于获取当前工作目录的绝对路径
  const root = process.cwd();
  const plugins = createPlugins()
  return defineConfig({
    server: {
      port: 8888,
      proxy: {
        // '/basic-api': {
        //   target: 'http://localhost:3000',
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        //   // only https
        //   // secure: false
        // },
      }
    },
    plugins,
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
        '@c': resolve(root, 'src/components'),
        '@v': resolve(root, 'src/views'),
        '@s': resolve(root, 'src/store'),
        '@h': resolve(root, 'src/hooks'),
        '@u': resolve(root, 'src/utils'),
        '@e': resolve(root, 'src/enums'),
        "@a": resolve(root, 'src/api'),
        '#': resolve(root, 'src/types'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(root, 'src/design/index.less')}";`,
            'primary-color': '#0960bd'
          },
          javascriptEnabled: true,
        }
      }
    },
  })
}
