import { pool } from "../config/dbConnection";
import { Role } from "../shared/schemas/role.schema";

export class RoleModel{
  
  async getRoles(){
    const res = await pool.query("select * from roles");
    return res.rows;
  };
  
  async getRoleById(id:number){
    const res = await pool.query('select * from roles where roleid=$1',[id])
    return res.rows[0]
  };
  
  async postRole(role:Role){
    const {rolename} = role
    const res = await pool.query(
      'insert into roles (rolename) values ($1) returning *',[rolename]
    )
    return res.rows[0]
  };
  
  async patchRole(role:Role, id:number){
    const {rolename} = role
    const res = await pool.query(
      'update roles set rolename = $1 where roleid=$2 returning *',[rolename, id]
    )
    return res.rows[0]
  };
}