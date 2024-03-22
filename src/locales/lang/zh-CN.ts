/*
 * @Date: 2024-02-26 10:46:18
 * @LastEditors: phil_litian
 */
import antdLocale from 'ant-design-vue/es/locale/zh_CN'
import { genMessage } from '../helper'
const modules = import.meta.glob('./zh-CN/**/*.json', { eager: true });
console.log('b--->', genMessage(modules, 'zh-CN'));

export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    // 引入ant-design语言文件
    antdLocale
  }
}