/*
 * @Date: 2024-03-06 21:39:45
 * @LastEditors: phil_litian
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
console.log('a--->');

const modules = import.meta.glob('./**/*.ts')
console.log('modules', modules);

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...(modules)[key].default);
});

export const setupProdMockServer = () => {
  createProdMockServer(mockModules)
}
