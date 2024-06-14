import { pool } from "../config/dbConnection";
import { Reservation } from "../shared/schemas/reservation.schema";

export class ReservationModel{
  async getReservations(){
    const res = await pool.query("select * from reservations");
    return res.rows;
  };
  
  async getReservationById(id:number){
    const res = await pool.query('select * from reservations where reservationid=$1',[id])
    return res.rows[0]
  };
  
  async postReservation(reservation:Reservation){
    const {bookid,userid,reservationdate} = reservation
    const res = await pool.query(
      'insert into reservations (bookid,userid,reservationdate) values ($1,$2,$3) returning *',[bookid,userid,reservationdate]
    )
    return res.rows[0]
  };
  
  async patchReservation(reservation:Reservation, id:number){
    const {bookid,userid,reservationdate} = reservation
    const res = await pool.query(
      'update reservations set bookid = $1, userid = $2, reservationdate = $3 where reservationid=$4 returning *',[bookid,userid,reservationdate, id]
    )
    return res.rows[0]
  };

  async fullfillReservation(id:number){
    const res = await pool.query(`update reservations set status='Fulfilled' where reservationid=$1`,[id])
    return res.rows[0]
  };

  async cancelReservation(id:number){
    const res = await pool.query(`update reservations set status='Cancelled' where reservationid=$1`,[id])
    return res.rows[0]
  };
}