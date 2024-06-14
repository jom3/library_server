import { pool } from "../config/dbConnection";
import { Supplier } from "../shared/schemas/suppliers.schema";

export class SupplierModel{
  
  async getSuppliers(){
    const res = await pool.query("select * from suppliers");
    return res.rows;
  };
  
  async getSupplierById(id:number){
    const res = await pool.query('select * from suppliers where supplierid=$1',[id])
    return res.rows[0]
  };
  
  async postSupplier(supplier:Supplier){
    const {suppliername,contactname,phone,email,address} = supplier
    const res = await pool.query(
      'insert into suppliers (suppliername,contactname,phone,email,address) values ($1,$2,$3,$4,$5) returning *',[suppliername,contactname,phone,email,address]
    )
    return res.rows[0]
  };
  
  async patchSupplier(supplier:Supplier, id:number){
    const {suppliername,contactname,phone,email,address} = supplier
    const res = await pool.query(
      'update suppliers set suppliername = $1, contactname = $2, phone = $3, email = $4, address = $5 where supplierid=$6 returning *',[suppliername,contactname,phone,email,address, id]
    )
    return res.rows[0]
  };

}