import { userController } from '../controller/index.js'

export default [
  {
    path: "/login",
    method: 'post',
    action: userController.login
  }
]