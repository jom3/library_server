import { pool } from "../config/dbConnection";
import { Fine } from "../shared/schemas/fine.schema";

export class FineModel{
  
  async getFines(){
    const res = await pool.query("select * from fines");
    return res.rows;
  };
  
  async getFineById(id:number){
    const res = await pool.query('select * from fines where fineid=$1',[id])
    return res.rows[0]
  };
  
  async postFine(fine:Fine){
    const {loanid,amount} = fine
    const res = await pool.query(
      'insert into fines (loanid,amount) values ($1,$2) returning *',[loanid,amount]
    )
    return res.rows[0]
  };
  
  async patchFine(fine:Fine, id:number){
    const {loanid, amount} = fine
    const res = await pool.query(
      'update fines set loanid = $1, amount = $2 where fineid=$3 returning *',[loanid,amount, id]
    )
    return res.rows[0]
  };

  async payFine(id:number){
    const res = await pool.query('update fines set paid=true, paidat=CURRENT_TIMESTAMP where fineid=$1',[id])
    return res.rows[0]
  };

}