import { Result } from "../utils/index.js";

export default class UserService {
  async login() {
    return Result.success({
      name: 'phil'
    })
  }
}