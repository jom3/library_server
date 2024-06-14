import { AuthModel } from "../models/auth.model"
import { Auth } from "../shared/schemas/auth.schema"
import { User } from "../shared/schemas/user.schema"

export class AuthService{

  constructor(
    private readonly authModel:AuthModel
  ){}

  async login(auth:Auth):Promise<User>{
    return await this.authModel.login(auth)
  }
  
}
