import { RoleInfo } from '@a/sys/models/userModel'


export interface UserInfo {
  userId: string | number,
  username: string,
  token: string,
  homePath: string,
  desc?: string,
  roles: RoleInfo[]
}
