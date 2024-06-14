import { pool } from "../config/dbConnection";
import { Auth } from "../shared/schemas/auth.schema";

export class AuthModel{

  async login(auth:Auth){
    const {email} = auth
    const res = await pool.query(`SELECT u.userid, firstname, lastname, status, email, phone, address, firedate, passwordhash, ARRAY_AGG(r.rolename) as roles FROM users AS u INNER JOIN user_role AS ur ON u.userid = ur.userid INNER JOIN roles AS r ON ur.roleid = r.roleid WHERE u.email = $1 GROUP BY u.userid`,[email])
    return res.rows[0]
  };
  
}