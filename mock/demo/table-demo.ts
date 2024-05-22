/*
 * @Date: 2024-05-14 10:03:20
 * @LastEditors: phil_litian
 */

import { MockMethod } from "vite-plugin-mock";
import { Random } from 'mockjs'
import { resultPageSuccess } from "../_utils";

const demoList = (() => {
  let result: any[] = []
  for(let i = 0; i < 200; i++ ) {
    result.push({
      id: `${i}`,
      beginTime: '@dateTime',
      endTime: '@dateTime',
      name: '@cname',
      name1: '@cname',
      name2: '@cname',
      address: '@city',
      'no|100000-10000000': 100000
    })
  }

  return result
})()

export default [
  {
    url: '/basic-api/table/getDemoList',
    method: 'get',
    response: ({ body, query }) => {
      const { page = 1, pageSize = 10 } = query
      return resultPageSuccess(page, pageSize, demoList)
    }
  }
] as MockMethod[]