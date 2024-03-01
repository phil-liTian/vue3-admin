/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888,
  },
  plugins: [
    vue(), 
    UnoCss(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/assets/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
      '@v': resolve(__dirname, 'src/views'),
      '@s': resolve(__dirname, 'src/store'),
      '@h': resolve(__dirname, 'src/hooks'),
      '@u': resolve(__dirname, 'src/utils'),
      '@e': resolve(__dirname, 'src/enums'),
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
  },

})
