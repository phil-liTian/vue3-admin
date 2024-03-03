/*
 * @Date: 2024-03-02 17:12:35
 * @LastEditors: phil_litian
 */

import { PAxios } from './Axios'

// 创建一个请求的对象
const createAxios = (opt?: any) => {
  return new PAxios()
}

export const defHttp = createAxios() 
