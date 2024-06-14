import { pool } from "../config/dbConnection";
import { Event } from "../shared/schemas/event.schema";

export class EventModel{
  
  async getEvents(){
    const res = await pool.query("select * from events");
    return res.rows;
  };
  
  async getEventById(id:number){
    const res = await pool.query('select * from events where eventid=$1',[id])
    return res.rows[0]
  };
  
  async postEvent(event:Event){
    const {eventname,eventdate,location,description} = event
    const res = await pool.query(
      'insert into events (eventname,eventdate,location,description) values ($1,$2,$3,$4) returning *',[eventname,eventdate,location,description]
    )
    return res.rows[0]
  };
  
  async patchEvent(event:Event, id:number){
    const {eventname,eventdate,location,description} = event
    const res = await pool.query(
      'update events set eventname = $1, eventdate = $2, location = $3, description = $4 where eventid=$5 returning *',[eventname,eventdate,location,description, id]
    )
    return res.rows[0]
  };
}