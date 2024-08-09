/*
 * @Date: 2024-03-20 15:37:13
 * @LastEditors: phil
 */
import { SizeType } from '@/components/PBase/Table'
import { RoleInfo } from '@a/sys/models/userModel'


export interface UserInfo {
  userId: string | number,
  username: string,
  token: string,
  homePath: string,
  desc?: string,
  roles: RoleInfo[]
}

// 错误日志保存字段
export interface ErrorLogInfo {
  name?: string,
  url: string,
  date?: string,
  file: string,
  stack?: string,
  detail?: string,
  message: string,
  type: string
}

export interface TableSetting {
  size: Nullable<SizeType>
}
