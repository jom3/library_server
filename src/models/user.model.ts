import { pool } from "../config/dbConnection";
import { User, UserRole } from '../shared/schemas/user.schema';

export class UserModel{
  
  async getUsers(){
    const res = await pool.query("select userid, firstname, lastname, status, email, phone, address from users");
    return res.rows;
  };
  
  async getUserById(id:number){
    const res = await pool.query('select userid, firstname, lastname, status, email, phone, address from users where userid=$1',[id])
    return res.rows[0]
  };
  
  async postUser(user:User){
    const {firstname,lastname,email,phone,address,passwordhash} = user
    const res = await pool.query(
      'insert into users (firstname,lastname,email,phone,address,passwordhash) values ($1,$2,$3,$4,$5,$6) returning *',[firstname,lastname,email,phone,address,passwordhash]
    )
    return res.rows[0]
  };
  
  async patchUser(user:User, id:number){
    const {firstname,lastname,email,phone,address} = user
    const res = await pool.query(
      'update users set firstname = $1, lastname = $2, email = $3, phone = $4, address = $5 where userid=$6 returning *',[firstname,lastname,email,phone,address, id]
    )
    return res.rows[0]
  };

  async removeUser(id:number){
    const res = await pool.query(`update users set status='Inactive' where userid=$1`,[id])
    return res.rows[0]
  };

  async restoreUser(id:number){
    const res = await pool.query(`update users set status='Active' where userid=$1`,[id])
    return res.rows[0]
  };

  async blockUser(id:number){
    const res = await pool.query(`update users set status='Blocked' where userid=$1`,[id])
    return res.rows[0]
  };

  async fireUser(id:number){
    const res = await pool.query(`update users set status='Fired', firedate=CURRENT_TIMESTAMP where userid=$1`,[id])
    return res.rows[0]
  };

  async addUserRole(userRole:UserRole){
    const {userid,roleid} = userRole
    const res = await pool.query(`insert into user_role (userid,roleid) values ($1,$2) returning *`,[userid,roleid])
    return res.rows[0]
  }
}