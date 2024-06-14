import { pool } from "../config/dbConnection";
import { Author } from "../shared/schemas/author.schema";

export class AuthorModel{
  async getAuthors(){
    const res = await pool.query("select * from authors");
    return res.rows;
  };
  
  async getAuthorById(id:number){
    const res = await pool.query('select * from authors where authorid=$1',[id])
    return res.rows[0]
  };
  
  async postAuthor(author:Author){
    const {firstname, lastname, birthdate, isactive,deathdate, nationality, biography,website,email,phone, photourl} = author
    const res = await pool.query(
      'insert into authors (firstname, lastname, birthdate, isactive,deathdate, nationality,biography,website,email,phone, photourl) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *',[firstname, lastname, birthdate, isactive,deathdate, nationality, biography,website,email,phone, photourl]
    )
    return res.rows[0]
  };
  
  async patchAuthor(author:Author, id:number){
    const {firstname, lastname, birthdate, isactive,deathdate, nationality, biography,website,email,phone, photourl} = author
    const res = await pool.query(
      'update authors set firstname = $1, lastname = $2, birthdate = $3, isactive = $4, deathdate = $5, nationality = $6, biography = $7, website = $8, email = $9, phone = $10, photourl = $11, updatedat=CURRENT_TIMESTAMP where authorid=$12 returning *',[firstname, lastname, birthdate, isactive,deathdate, nationality, biography,website,email,phone, photourl, id]
    )
    return res.rows[0]
  };
}