/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import UnoCss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
      '@v': resolve(__dirname, 'src/views'),
      '@s': resolve(__dirname, 'src/store'),
      '@h': resolve(__dirname, 'src/hooks'),
      '@u': resolve(__dirname, 'src/utils'),
      '#': resolve(__dirname, 'src/types'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(__dirname, 'src/design/index.less')}";`,
          'primary-color': '#0960bd'
        },
        javascriptEnabled: true,
      }
    }
  }
})
