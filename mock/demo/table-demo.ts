/*
 * @Date: 2024-05-14 10:03:20
 * @LastEditors: phil_litian
 */

import { MockMethod } from "vite-plugin-mock";
import { Random } from 'mockjs'
import { resultPageSuccess } from "../_utils";

const getRandomPics = (count = 10): string[] => {
  const arr: string[] = []
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('200*100', Random.color(), Random.color(), 'phil'))
  }
  return arr
}

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
      avatar: Random.image('400*400', Random.color(), Random.color(), Random.first()),
      imgs: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      date: '@date(yyyy-MM-dd)',
      time: '@time(HH:mm:ss)',
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