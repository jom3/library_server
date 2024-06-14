import { UserModel } from '../models/user.model';
import { User, UserRole } from '../shared/schemas/user.schema';

export class UserService{

  constructor(
    private readonly userModel:UserModel
  ){}

  async getUsers():Promise<User[]>{
    return await this.userModel.getUsers()
  }
  
  async getUserById(id:number):Promise<User>{
    return await this.userModel.getUserById(id)
  }
  
  async postUser(user:User):Promise<User>{
    return await this.userModel.postUser(user)
  }
  
  async patchUser(user:User, id:number):Promise<User>{
    return await this.userModel.patchUser(user,id)
  }

  async removeUser(id:number):Promise<User>{
    return await this.userModel.removeUser(id)
  }

  async restoreUser(id:number):Promise<User>{
    return await this.userModel.restoreUser(id)
  }

  async blockUser(id:number):Promise<User>{
    return await this.userModel.blockUser(id)
  }

  async fireUser(id:number):Promise<User>{
    return await this.userModel.fireUser(id)
  }

  async addUserRole(userRole:UserRole):Promise<UserRole>{
    return await this.userModel.addUserRole(userRole)
  }
}
