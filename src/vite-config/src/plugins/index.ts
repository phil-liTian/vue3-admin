/*
 * @Date: 2024-03-06 21:24:59
 * @LastEditors: phil_litian
 */
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { configMockPlugin } from './mock'

export function createPlugins() {
  const root = process.cwd()
  let vitePlugins = [ 
    vue(), 
    vueJsx(), 
    UnoCss(), 
    createSvgIconsPlugin({
      iconDirs: [resolve(root, 'src/assets/icons')]
    }) 
  ]

  vitePlugins.push(configMockPlugin())
  
  return vitePlugins
}
