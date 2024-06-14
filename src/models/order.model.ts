import { pool } from "../config/dbConnection";
import { Order,OrderDetail } from "../shared/schemas/order.schema";

export class OrderModel{
  async getOrders(){
    const res = await pool.query("select * from bookorders");
    return res.rows;
  };
  
  async getOrderById(id:number){
    const res = await pool.query('select * from bookorders where orderid=$1',[id])
    return res.rows[0]
  };
  
  async postOrder(order:Order){
    const {supplierid,orderdate,totalamount} = order
    const res = await pool.query(
      'insert into bookorders (supplierid,orderdate,totalamount) values ($1,$2,$3) returning *',[supplierid,orderdate,totalamount]
    )
    return res.rows[0]
  };
  
  async patchOrder(order:Order, id:number){
    const {supplierid,orderdate,totalamount} = order
    const res = await pool.query(
      'update bookorders set supplierid = $1, orderdate = $2, totalamount = $3 where orderid=$4 returning *',[supplierid,orderdate,totalamount, id]
    )
    return res.rows[0]
  };

  async receiveOrder(id:number){
    const res = await pool.query(`update bookorders set status='Received' where orderid=$1`,[id])
    return res.rows[0]
  };

  async cancelOrder(id:number){
    const res = await pool.query(`update bookorders set status='Cancelled' where orderid=$1`,[id])
    return res.rows[0]
  };

  //* book orders details

  async getOrderDetails(){
    const res = await pool.query("select * from bookorderdetails");
    return res.rows;
  };
  
  async getOrderDetailById(id:number){
    const res = await pool.query('select * from bookorderdetails where orderdetailid=$1',[id])
    return res.rows[0]
  };
  
  async postOrderDetail(orderDetail:OrderDetail){
    const {orderid,bookid,quantity,price} = orderDetail
    const res = await pool.query(
      'insert into bookorderdetails (orderid,bookid,quantity,price) values ($1,$2,$3,$4) returning *',[orderid,bookid,quantity,price]
    )
    return res.rows[0]
  };
  
  async patchOrderDetail(orderDetail:OrderDetail, id:number){
    const {orderid,bookid,quantity,price} = orderDetail
    const res = await pool.query(
      'update bookorderdetails set orderid = $1, bookid = $2, quantity = $3, price=$4 where orderdetailid=$5 returning *',[orderid,bookid,quantity,price, id]
    )
    return res.rows[0]
  };

}