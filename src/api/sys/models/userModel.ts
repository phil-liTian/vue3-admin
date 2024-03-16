/*
 * @Date: 2024-03-04 13:15:59
 * @LastEditors: phil_litian
 */

// 登录返回的数据结构
export interface LoginResultModel {
  userId: string,
  token: string,
}

export interface LoginParams {
  username: string,
  password: string
}

export interface GetUserInfoModel {
  roles: [],
  userId: string | number,
  username: string,
  
}

