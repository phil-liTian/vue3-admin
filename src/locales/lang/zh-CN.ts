/*
 * @Date: 2024-02-26 10:46:18
 * @LastEditors: phil_litian
 */

import { genMessage } from '../helper'
const modules = import.meta.glob('./zh-CN/**/*.json', { eager: true });

export default {
  message: {
    ...genMessage(modules, 'zh-CN')
  }
}