/*
 * @Date: 2024-03-06 21:32:22
 * @LastEditors: phil_litian
 */

import { viteMockServe } from 'vite-plugin-mock';

export const configMockPlugin = () => {
  
  return viteMockServe({
    ignore: /^_/, // 以_开头的
    mockPath: 'mock',
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer()
    `
  })
}
