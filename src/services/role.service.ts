import { RoleModel } from '../models/role.model';
import { Role } from '../shared/schemas/role.schema';

export class RoleService{

  constructor(
    private readonly roleModel:RoleModel
  ){}

  async getRoles():Promise<Role[]>{
    return await this.roleModel.getRoles()
  }
  
  async getRoleById(id:number):Promise<Role>{
    return await this.roleModel.getRoleById(id)
  }
  
  async postRole(role:Role):Promise<Role>{
    return await this.roleModel.postRole(role)
  }
  
  async patchRole(role:Role, id:number):Promise<Role>{
    return await this.roleModel.patchRole(role,id)
  }
}
