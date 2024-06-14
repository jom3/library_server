import { pool } from "../config/dbConnection";
import { Loan } from "../shared/schemas/loans.schema";

export class LoanModel{
  
  async getLoans(){
    const res = await pool.query("select * from loans");
    return res.rows;
  };
  
  async getLoanById(id:number){
    const res = await pool.query('select * from loans where loanid=$1',[id])
    return res.rows[0]
  };
  
  async postLoan(loan:Loan){
    const {bookid,userid,employeeid} = loan
    const res = await pool.query(
      'insert into loans (bookid,userid,employeeid,loandate) values ($1,$2,$3,CURRENT_TIMESTAMP) returning *',[bookid,userid,employeeid]
    )
    return res.rows[0]
  };
  
  async patchLoan(loan:Loan, id:number){
    const {bookid,userid,employeeid} = loan
    const res = await pool.query(
      'update loans set bookid = $1, userid = $2, employeeid = $3 where loanid=$4 returning *',[bookid,userid,employeeid, id]
    )
    return res.rows[0]
  };

  async returnBook(id:number){
    const res = await pool.query('update loans set returndate=CURRENT_TIMESTAMP where loanid=$1',[id])
    return res.rows[0]
  };

}