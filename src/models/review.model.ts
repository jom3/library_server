import { pool } from "../config/dbConnection";
import { Review } from "../shared/schemas/review.schema";

export class ReviewModel{
  async getReviews(){
    const res = await pool.query("select * from reviews");
    return res.rows;
  };
  
  async getReviewById(id:number){
    const res = await pool.query('select * from reviews where reviewid=$1',[id])
    return res.rows[0]
  };
  
  async postReview(review:Review){
    const {bookid,userid,rating,comment,reviewdate} = review
    const res = await pool.query(
      'insert into reviews (bookid,userid,rating,comment,reviewdate) values ($1,$2,$3,$4,$5) returning *',[bookid,userid,rating,comment,reviewdate]
    )
    return res.rows[0]
  };
  
  async patchReview(review:Review, id:number){
    const {bookid,userid,rating,comment,reviewdate} = review
    const res = await pool.query(
      'update reviews set bookid = $1, userid = $2, rating = $3, comment = $4, reviewdate = $5 where reviewid=$6 returning *',[bookid,userid,rating,comment,reviewdate, id]
    )
    return res.rows[0]
  };
}