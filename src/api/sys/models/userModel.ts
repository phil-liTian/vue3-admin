/*
 * @Date: 2024-03-04 13:15:59
 * @LastEditors: phil_litian
 */

export interface RoleInfo {
  roleName: string,
  value: string
}

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
  roles: RoleInfo[],
  userId: string | number,
  username: string,
}

