import { pool } from "../config/dbConnection";
import { Book, BookAuthor, BookCategory } from "../shared/schemas/book.schema";

export class BookModel{
  async getBooks(){
    const res = await pool.query("select * from books");
    return res.rows;
  };
  
  async getBookById(id:number){
    const res = await pool.query('select * from books where bookid=$1',[id])
    return res.rows[0]
  };
  
  async postBook(book:Book){
    const {title,isbn,publisher,datepublished} = book
    const res = await pool.query(
      'insert into books (title,isbn,publisher,datepublished) values ($1,$2,$3,$4) returning *',[title,isbn,publisher,datepublished]
    )
    return res.rows[0]
  };
  
  async patchBook(book:Book, id:number){
    const {title,isbn,publisher,datepublished} = book
    const res = await pool.query(
      'update books set title = $1, isbn = $2, publisher = $3, datepublished = $4 where bookid=$5 returning *',[title,isbn,publisher,datepublished, id]
    )
    return res.rows[0]
  };

  async addAuthor(bookAuthor:BookAuthor){
    const {bookid,authorid} = bookAuthor;
    const res = await pool.query(
      'insert into bookauthors (bookid, authorid) values ($1,$2) returning *',[bookid,authorid]
    )
    return res.rows[0]
  };

  async addCategory(bookCategory:BookCategory){
    const {bookid,categoryid} = bookCategory;
    const res = await pool.query(
      'insert into bookcategories (bookid,categoryid) values ($1,$2) returning *',[bookid,categoryid]
    )
    return res.rows[0]
  };
}