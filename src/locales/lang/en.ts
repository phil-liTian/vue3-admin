/*
 * @Date: 2024-02-26 10:46:01
 * @LastEditors: phil_litian
 */
import antdLocale from 'ant-design-vue/es/locale/en_US'
import { genMessage } from '../helper'
const modules = import.meta.glob('./en/**/*.json', { eager: true });

export default {
  message: {
    ...genMessage(modules, 'en'),
    // 引入ant-design语言文件
    antdLocale
  }
}