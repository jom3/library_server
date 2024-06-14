import { pool } from "../config/dbConnection";
import { Transaction } from "../shared/schemas/transaction.schema";

export class TransactionModel{
  async getTransactions(){
    const res = await pool.query("select * from transactionhistory");
    return res.rows;
  };
  
  async getTransactionById(id:number){
    const res = await pool.query('select * from transactionhistory where transactionid=$1',[id])
    return res.rows[0]
  };
  
  async postTransaction(transaction:Transaction){
    const {transactiondate,userid,employeeid,transactiontype, details} = transaction
    const res = await pool.query(
      'insert into transactionhistory (transactiondate,userid,employeeid,transactiontype, details) values ($1,$2,$3,$4,$5) returning *',[transactiondate,userid,employeeid,transactiontype, details]
    )
    return res.rows[0]
  };
  
  async patchTransaction(transaction:Transaction, id:number){
    const {transactiondate,userid,employeeid,transactiontype, details} = transaction
    const res = await pool.query(
      'update transactionhistory set transactiondate = $1, userid = $2, employeeid = $3, transactiontype = $4, details = $5 where transactionid=$6 returning *',[transactiondate,userid,employeeid,transactiontype, details, id]
    )
    return res.rows[0]
  };
}