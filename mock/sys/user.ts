/*
 * @Date: 2024-03-07 09:06:49
 * @LastEditors: phil_litian
 */
import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_utils'

interface userParams {
  userId: string,
  username: string,
  password: string,
  token: string,
  desc: string,
  homePath: string,
  avatar?: string,
  roles: any[]
}

const FakerUserList: userParams[] = [
  {
    userId: '1',
    username: 'phil',
    password: '123456',
    token: 'phil-token',
    desc: 'manager',
    homePath: '/dashboard/analysis',
    avatar: '',
    roles: [
      { roleName: 'Super Admin', value: 'super' }
    ]
  },
  {
    userId: '2',
    username: 'test',
    password: '123456',
    token: 'test-token',
    desc: 'tester',
    avatar: "",
    homePath: '/dashboard/workbench',
    roles: [
      { roleName: 'Tester', value: 'test' }
    ]
  },
]


export default [
  {
    url: '/basic-api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      const checkUser = FakerUserList.find(v => v.username === username && v.password === password)
      
      if( !checkUser ) {
        return resultError('Incorrect account or password')
      }

      const { token, roles, userId } = checkUser as unknown as userParams
      
      return resultSuccess({
        username,
        token,
        roles,
        userId
      })
    }
  },
  {
    url: '/basic-api/logout', // 退出登录
    method: 'get',
    response: (request) => {
      const { headers } = request
      const token = getRequestToken(headers)
      if ( !token ) return resultError('Invalid token')

      console.log('logout');
      
    }
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if ( !token ) return resultError('Invalid token')
      const matchUserInfo = FakerUserList.find(v => v.token === token)
      
      return resultSuccess(matchUserInfo)
    }
  }
] as MockMethod[]
