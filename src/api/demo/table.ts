/*
 * @Date: 2024-05-14 10:09:35
 * @LastEditors: phil_litian
 */

import { defHttp } from "@/utils/http/axios"
enum Api {
  DEMO_LIST = '/table/getDemoList'
}

export const demoListApi = (params) => {
  return defHttp.get({
    url: Api.DEMO_LIST,
    params
  })
}