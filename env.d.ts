/*
 * @Date: 2024-02-21 10:44:26
 * @LastEditors: phil_litian
 */

// 告诉typeScript .vue结尾的都是vue组件, 可以通过import导入。可解决模块无法识别的问题
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
