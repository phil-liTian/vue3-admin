import { UserService } from '../service/index.js'

class UserController {
  service = new UserService()
  login = async (ctx) => {
    ctx.body = await this.service.login()
  }
}

export default new UserController()