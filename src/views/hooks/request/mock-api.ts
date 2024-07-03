/*
 * @Date: 2024-06-19 13:19:43
 * @LastEditors: phil_litian
 */
import Mock from 'mockjs'

export async function imitateApi(userName?: string, pass: boolean = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ( pass ) {
        resolve(userName || Mock.mock('@cname'))
      } else {
        reject(new Error(`failed to modify usename: ${userName}`))
      }
    }, 1000);
  })
}

export async function getArtical(keyword?: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
        keyword
      })
    }, 1000);
  })
}
