/*
 * @Date: 2024-03-20 15:37:13
 * @LastEditors: phil_litian
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

export interface TableSetting {
  size: Nullable<SizeType>
}
